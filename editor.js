/* =====================================================
   MODO EDITOR (dentro do próprio site)
   Usa o mesmo login do painel (Netlify Identity + Git Gateway):
   envia áudios e imagens e salva os blocos e músicas, sem abrir o /admin.
   ===================================================== */
(function(){
  var ni=window.netlifyIdentity, BR='main', API='/.netlify/git/github/contents/';
  var MAX_IMG=1600, MAX_AUDIO=8*1024*1024, SLOTS=5;
  var $=function(s,r){return (r||document).querySelector(s)};
  function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  /* barra do editor */
  var bar=document.createElement('div'); bar.className='ed-bar'; bar.hidden=true;
  bar.innerHTML='<span>&#9998; Modo editor ligado</span><button type="button" id="edOut">Sair do modo editor</button>';
  document.body.appendChild(bar);

  function rerender(){ var d=window.ADT_JSON; if(window.ADT_RB) window.ADT_RB(d); if(window.ADT_RM) window.ADT_RM(d) }
  function setEditing(on){ document.body.classList.toggle('editing',on); bar.hidden=!on; rerender() }

  var login=$('#edLogin');
  if(login) login.addEventListener('click',function(){
    if(!ni){ alert('O modo editor funciona no site publicado (adonaitune.netlify.app).'); return }
    ni.open('login');
  });
  $('#edOut').addEventListener('click',function(){ if(ni) ni.logout(); setEditing(false) });
  if(ni){
    ni.on('login',function(){ ni.close(); setEditing(true) });
    ni.on('logout',function(){ setEditing(false) });
    ni.on('init',function(u){ if(u) setEditing(true) });
    var u0=ni.currentUser&&ni.currentUser(); if(u0) setEditing(true);
  }

  /* ---------- envio para o GitHub (via Git Gateway) ---------- */
  function token(){ var u=ni&&ni.currentUser(); if(!u) return Promise.reject(new Error('Entre no modo editor primeiro.')); return u.jwt() }
  function call(path,opt){
    return token().then(function(t){
      opt=opt||{}; opt.headers=Object.assign({'Authorization':'Bearer '+t,'Content-Type':'application/json'},opt.headers||{});
      return fetch(API+path,opt);
    }).then(function(r){
      if(r.ok) return r.json();
      var e=new Error(r.status===401?'Sua sessão expirou. Saia e entre de novo no modo editor.':r.status===413?'O arquivo é grande demais para enviar por aqui.':'Não foi possível salvar (erro '+r.status+').'); e.status=r.status; throw e;
    });
  }
  function b64(str){ return btoa(unescape(encodeURIComponent(str))) }
  function safe(n){ return n.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9.]+/g,'-').replace(/^-+|-+$/g,'') || 'arquivo' }
  function readB64(file){ return new Promise(function(ok,no){ var r=new FileReader(); r.onload=function(){ ok(String(r.result).split(',')[1]) }; r.onerror=no; r.readAsDataURL(file) }) }
  function shrink(file){ /* imagens: reduz para até 1600 px (JPEG) para o site ficar rápido */
    return new Promise(function(ok,no){
      var url=URL.createObjectURL(file), im=new Image();
      im.onload=function(){
        var k=Math.min(1,MAX_IMG/Math.max(im.width,im.height)), c=document.createElement('canvas');
        c.width=Math.round(im.width*k); c.height=Math.round(im.height*k);
        var x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height); x.drawImage(im,0,0,c.width,c.height);
        URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg',.85).split(',')[1]);
      };
      im.onerror=function(){ no(new Error('Não consegui abrir a imagem '+file.name)) }; im.src=url;
    });
  }
  function upload(file,kind){
    if(kind==='audio'&&file.size>MAX_AUDIO) return Promise.reject(new Error('O áudio "'+file.name+'" passa de 8 MB. Use um arquivo menor.'));
    var name=Date.now()+'-'+safe(file.name.replace(/\.[^.]+$/,''))+(kind==='img'?'.jpg':'.'+safe(file.name.split('.').pop()));
    var path='assets/uploads/'+name;
    return (kind==='img'?shrink(file):readB64(file)).then(function(c){
      return call(path,{method:'PUT',body:JSON.stringify({message:'Editor do site: envio de '+name,content:c,branch:BR})});
    }).then(function(){ return path });
  }
  function saveJson(mut,tries){
    return call('data/site.json?ref='+BR).then(function(f){
      var d=JSON.parse(decodeURIComponent(escape(atob(f.content.replace(/\s/g,'')))));
      mut(d);
      return call('data/site.json',{method:'PUT',body:JSON.stringify({message:'Editor do site: conteúdo atualizado',content:b64(JSON.stringify(d,null,2)),sha:f.sha,branch:BR})}).then(function(){ return d });
    }).catch(function(e){ if(e.status===409&&(tries||0)<2) return saveJson(mut,(tries||0)+1); throw e });
  }

  /* ---------- editar um bloco (título, áudio, 5 imagens) ---------- */
  document.addEventListener('click',function(e){
    var b=e.target.closest('.ed-btn'); if(b){ openBlock(b.closest('.blk')) }
    var m=e.target.closest('.ed-add-music'); if(m){ openMusic(m.closest('.mus')) }
  });
  function openBlock(art){
    var tab=art.getAttribute('data-tab'), n=art.getAttribute('data-n'), key='bloco_'+tab+'_'+n;
    var cur=(window.ADT_JSON&&window.ADT_JSON[key])||{}, imgs=(cur.images||[]).filter(Boolean).slice(0,SLOTS);
    var slots=''; for(var i=0;i<SLOTS;i++){ var v=imgs[i]||'';
      slots+='<div class="ed-slot" data-old="'+esc(v)+'"><b>Imagem '+(i+1)+'</b>'+(v?'<img src="'+esc(v)+'" alt="">':'<div style="aspect-ratio:4/3;display:grid;place-items:center;color:var(--muted)">vazia</div>')+'<input type="file" accept="image/*">'+(v?'<label style="display:flex;gap:6px;font-weight:600"><input type="checkbox" class="rm"> remover</label>':'')+'</div>' }
    art.innerHTML='<div class="ed-head"><span>Editando o bloco '+n+'</span></div><form class="ed-form"><label>Título<input type="text" class="f-title" value="'+esc(cur.title||'')+'"></label>'
      +'<label>Áudio (mp3, até 8 MB)'+(cur.audio?'<small>Atual: '+esc(cur.audio.split('/').pop())+' <label style="display:inline-flex;gap:6px"><input type="checkbox" class="f-rmaudio"> remover</label></small>':'')+'<input type="file" class="f-audio" accept="audio/*"></label>'
      +'<div><b>Carrossel (até 5 imagens)</b><div class="ed-slots">'+slots+'</div></div>'
      +'<div class="ed-actions"><button type="submit" class="btn sm">Salvar</button><button type="button" class="btn ghost sm f-cancel">Cancelar</button><span class="ed-msg"></span></div></form>';
    $('.f-cancel',art).onclick=rerender;
    $('form',art).onsubmit=function(ev){ ev.preventDefault(); saveBlock(art,key,cur) };
  }
  function msg(art,t,cls){ var m=$('.ed-msg',art); m.textContent=t; m.className='ed-msg '+(cls||'') }
  function saveBlock(art,key,cur){
    msg(art,'Enviando… não feche esta página.'); $('button[type=submit]',art).disabled=true;
    var title=$('.f-title',art).value.trim(), audioF=$('.f-audio',art).files[0], rmA=$('.f-rmaudio',art)&&$('.f-rmaudio',art).checked;
    var slotEls=[].slice.call(art.querySelectorAll('.ed-slot')), blobs={};
    var audioP=audioF?upload(audioF,'audio'):Promise.resolve(rmA?'':(cur.audio||''));
    var imgP=slotEls.map(function(sl){ var f=$('input[type=file]',sl).files[0], rm=$('.rm',sl)&&$('.rm',sl).checked, old=sl.getAttribute('data-old');
      if(f) return upload(f,'img').then(function(p){ blobs[p]=URL.createObjectURL(f); return p });
      return Promise.resolve(rm?'':old) });
    Promise.all([audioP].concat(imgP)).then(function(r){
      var audio=r[0], images=r.slice(1).filter(Boolean);
      msg(art,'Salvando…');
      return saveJson(function(d){ d[key]={title:title,audio:audio,images:images} }).then(function(d){
        var local=JSON.parse(JSON.stringify(d)); /* mostra já na tela (o site publica em ~1 min) */
        local[key].images=images.map(function(p){return blobs[p]||p}); window.ADT_JSON=local; rerender();
        var a=document.querySelector('.blk[data-tab="'+key.split('_')[1]+'"][data-n="'+key.split('_')[2]+'"]');
        if(a) a.insertAdjacentHTML('afterbegin','<p class="ed-msg ok">Salvo! Aparece para todos no site em cerca de 1 minuto.</p>');
      });
    }).catch(function(er){ msg(art,er.message||'Erro ao salvar.','err'); $('button[type=submit]',art).disabled=false });
  }

  /* ---------- adicionar música ---------- */
  function openMusic(card){
    card.innerHTML='<form class="ed-form"><label>Título da música<input type="text" class="f-t"></label><label>Artista<input type="text" class="f-a" value="AdonaiTune"></label><label>Arquivo mp3 (até 8 MB)<input type="file" class="f-f" accept="audio/*" required></label><div class="ed-actions"><button type="submit" class="btn sm">Salvar</button><button type="button" class="btn ghost sm f-cancel">Cancelar</button></div><span class="ed-msg"></span></form>';
    $('.f-cancel',card).onclick=rerender;
    $('form',card).onsubmit=function(ev){
      ev.preventDefault(); var f=$('.f-f',card).files[0], t=$('.f-t',card).value.trim()||f.name.replace(/\.[^.]+$/,''), ar=$('.f-a',card).value.trim();
      msg(card,'Enviando… não feche esta página.'); $('button[type=submit]',card).disabled=true;
      upload(f,'audio').then(function(p){
        return saveJson(function(d){ d.playlist=(d.playlist||[]).filter(function(x){return x.src}); d.playlist.push({title:t,artist:ar,src:p,exemplo:false}) }).then(function(d){
          var local=JSON.parse(JSON.stringify(d)); local.playlist[local.playlist.length-1].src=URL.createObjectURL(f); window.ADT_JSON=local; rerender();
        });
      }).catch(function(er){ msg(card,er.message||'Erro ao salvar.','err'); $('button[type=submit]',card).disabled=false });
    };
  }
})();
