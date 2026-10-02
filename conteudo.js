/* =====================================================================
   CONTEÚDO DO SITE ADONAI SHALOM / ADONAITUNE
   Aqui ficam os textos, links e postagens. Para trocar algo, edite
   apenas o que está entre aspas. Não apague vírgulas nem colchetes.
   ===================================================================== */
window.SITE = {

  /* Link da transmissão da rádio. O primeiro é tentado antes; se falhar, usa o segundo. */
  stream: [
    "https://sapircast.caster.fm:11225/Mw3Cv?token=0c1581659ddfa16ad92831b46ac36d2a"
  ],

  /* Publicações da aba ADONAI SHALOM.
     cat: Projetos, Evangelismo, Pregações ou Mensagens.
     url: link do vídeo ou da postagem (deixe "" se não tiver).
     img: endereço de uma foto de capa, se quiser (opcional). Ex.: img: "assets/foto1.jpg".
     exemplo: true mostra a etiqueta "exemplo". Apague essa parte quando colocar conteúdo real. */
  posts: [
    { cat: "Pregações",   date: "", title: "Sua próxima pregação aparece aqui",  text: "Escreva um resumo curto da mensagem e coloque o link do vídeo, se tiver.", url: "", exemplo: true },
    { cat: "Evangelismo", date: "", title: "Relato de evangelismo",               text: "Conte onde foi, quem participou e o que Deus fez.", url: "", exemplo: true },
    { cat: "Projetos",    date: "", title: "Um projeto do Adonai Shalom",         text: "Explique o objetivo do projeto e como as pessoas podem participar.", url: "", exemplo: true },
    { cat: "Mensagens",   date: "", title: "Mensagem da semana",                  text: "Uma palavra curta para edificar quem visita o site.", url: "", exemplo: true },
    { cat: "Pregações",   date: "", title: "Outra pregação",                      text: "Cada publicação nova entra no topo da lista.", url: "", exemplo: true }
  ],

  /* Notícias da aba ADONAITUNE */
  news: [
    { date: "", title: "Novidade da rádio",           text: "Avisos, programação especial e novas músicas entram aqui.", exemplo: true },
    { date: "", title: "Divulgue a AdonaiTune",       text: "Compartilhe o link da rádio com quem precisa de uma palavra hoje.", exemplo: true },
    { date: "", title: "Peça sua oração",             text: "Explique aqui como o ouvinte pode enviar um pedido de oração.", exemplo: true }
  ],

  /* Stories em formato vertical 9:16, iguais aos do Instagram (aparecem nas duas abas).
     type: "video" ou "image".
     src: o link direto do arquivo de vídeo (.mp4) ou de foto (.jpg/.png), em formato vertical 9:16.
     poster: uma imagem pequena para a bolinha (opcional; sem ela aparece um ícone).
     label: o texto curto embaixo da bolinha.
     caption: o texto que aparece na base do story, ao abrir (opcional).
     Envie os vídeos e fotos para o Claude no chat que ele coloca aqui, ou cole o link do arquivo já publicado. */

  /* ===== Podcast: episódios (url = link do YouTube; src = arquivo de áudio .mp3) ===== */
  /* Blocos de exemplo (título + áudio + imagens). Os reais são preenchidos pelo painel /admin. */
  bloco_shalom_1: { title: "Exemplo: título da mensagem", audio: "assets/exemplo-audio.wav", images: ["assets/exemplo-shalom-1.jpg", "assets/exemplo-shalom-2.jpg", "assets/exemplo-shalom-3.jpg", "assets/exemplo-shalom-4.jpg", "assets/exemplo-shalom-5.jpg"] },
  bloco_podcast_1: { title: "Exemplo: título da mensagem", audio: "assets/exemplo-audio.wav", images: ["assets/capa-cafe-com-elas.svg", "assets/logo-cafe-com-elas.svg"] },
  bloco_kids_1: { title: "Exemplo: título da mensagem", audio: "assets/exemplo-audio.wav", images: ["assets/exemplo-kids-1.jpg", "assets/exemplo-kids-2.jpg", "assets/exemplo-kids-3.jpg", "assets/exemplo-kids-4.jpg", "assets/exemplo-kids-5.jpg"] },

  /* Quadro em destaque da aba Café com Elas: cole o link do YouTube (vídeo ou transmissão ao vivo). */
  podcast_live: { url: "", aovivo: false, title: "", text: "", channelId: "" },
  podcast: [
    { title: "Café com Elas com Naiara Delmondes | Entrevista com Luana Souza", date: "", text: "Entrevista no Café com Elas.", url: "https://www.youtube.com/watch?v=aQtDlqCFDLY", src: "", exemplo: false },
    { title: "Café com Elas com Naiara Delmondes | Entrevista com Edna Carvalho", date: "", text: "Entrevista no Café com Elas.", url: "", src: "", exemplo: false },
    { title: "Café com Elas com Naiara Delmondes | Entrevista com Amanda Sousa", date: "", text: "Entrevista no Café com Elas.", url: "", src: "", exemplo: false },
    { title: "Café com Elas com Naiara Delmondes | Conversa com a Apóstola Fran Dias", date: "", text: "Entrevista no Café com Elas.", url: "", src: "", exemplo: false }
  ],

  /* ===== AdonaiTune Kids ===== */
  posts_kids: [{"cat": "Músicas", "date": "", "title": "Louvor da semana", "text": "Uma música animada para cantar junto com a criançada.", "url": "", "img": "", "exemplo": true}, {"cat": "Mensagens", "date": "", "title": "Mensagem para os pequenos", "text": "Uma palavra curtinha, no jeito das crianças.", "url": "", "img": "", "exemplo": true}, {"cat": "Atividades", "date": "", "title": "Atividade da semana", "text": "Uma brincadeira ou desafio com propósito.", "url": "", "img": "", "exemplo": true}, {"cat": "Eventos", "date": "", "title": "Próximo encontro Kids", "text": "Data, local e horário do próximo evento para a criançada.", "url": "", "img": "", "exemplo": true}],
  /* Vídeos do YouTube: a chave (apiKey) é gratuita, criada no Google Cloud.
     channelHandle = o @ do canal, sem o @ (ex.: adonaitune).
     channelHandleKids = opcional, se o canal Kids for outro. */
  youtube: { apiKey: "", channelHandle: "adonaitune", channelHandleShalom: "", channelHandleKids: "" },
  /* Vídeos escolhidos à mão (opcional): cole o link do YouTube em url. Aparecem antes dos automáticos. */
  videos_shalom: [], videos_tune: [], videos_kids: [],
  stories: {
    shalom: [
      { type: "video", src: "", poster: "", label: "Prévia",  caption: "", exemplo: true },
      { type: "image", src: "", poster: "", label: "Evento",  caption: "", exemplo: true }
    ],
    tune: [
      { type: "video", src: "", poster: "", label: "Ao vivo", caption: "", exemplo: true }
    ],
    kids: [
      { type: "video", src: "", poster: "", label: "Kids", caption: "", exemplo: true }
    ]
  },

  /* Playlist da AdonaiTune (as músicas da rádio, separadas da transmissão ao vivo).
     src: o link direto do arquivo de áudio (.mp3). Sem o link, a música aparece na lista mas sem o botão de tocar.
     Envie os arquivos das 7 músicas para o Claude no chat, ou cole os links delas já publicados. */
  playlist: [
    { title: "Exemplo: música 1", artist: "AdonaiTune", src: "assets/exemplo-audio.wav", exemplo: true },
    { title: "Exemplo: música 2", artist: "AdonaiTune", src: "assets/exemplo-audio.wav", exemplo: true },
    { title: "Exemplo: música 3", artist: "AdonaiTune", src: "assets/exemplo-audio.wav", exemplo: true },
    { title: "Música 4", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 5", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 6", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 7", artist: "AdonaiTune", src: "", exemplo: true }
  ],

  /* Redes sociais. Cole o endereço em url. Enquanto estiver vazio, o botão aparece como "em breve".
     rede: instagram, facebook, youtube, whatsapp ou tiktok. */
  social: {
    podcast: [{ rede: "spotify", nome: "Spotify", url: "" }, { rede: "podcast", nome: "Apple Podcasts", url: "" }, { rede: "youtube", nome: "YouTube", url: "" }],
    shalom: [
      { rede: "instagram", nome: "Instagram", url: "" },
      { rede: "facebook",  nome: "Facebook",  url: "" },
      { rede: "youtube",   nome: "YouTube",   url: "" },
      { rede: "whatsapp",  nome: "WhatsApp",  url: "" },
      { rede: "tiktok",    nome: "TikTok",    url: "" }
    ],
    kids: [{"rede": "instagram", "nome": "Instagram", "url": ""}, {"rede": "facebook", "nome": "Facebook", "url": ""}, {"rede": "youtube", "nome": "YouTube", "url": ""}, {"rede": "whatsapp", "nome": "WhatsApp", "url": ""}, {"rede": "tiktok", "nome": "TikTok", "url": ""}],
    tune: [
      { rede: "instagram", nome: "Instagram", url: "" },
      { rede: "facebook",  nome: "Facebook",  url: "" },
      { rede: "youtube",   nome: "YouTube",   url: "" },
      { rede: "whatsapp",  nome: "WhatsApp",  url: "" },
      { rede: "tiktok",    nome: "TikTok",    url: "" }
    ]
  }
};
