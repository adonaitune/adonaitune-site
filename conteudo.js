/* =====================================================================
   CONTEÚDO DO SITE ADONAI SHALOM / ADONAITUNE
   Aqui ficam os textos, links e postagens. Para trocar algo, edite
   apenas o que está entre aspas. Não apague vírgulas nem colchetes.
   ===================================================================== */
window.SITE = {

  /* Link da transmissão da rádio. O primeiro é tentado antes; se falhar, usa o segundo. */
  stream: [
    "https://sapircast.caster.fm:11225/Mw3Cv",
    "https://sapircast.caster.fm:11225/Mw3Cv?token=74381f154315899824c6949d5aa09a05"
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
  stories: {
    shalom: [
      { type: "video", src: "", poster: "", label: "Prévia",  caption: "", exemplo: true },
      { type: "image", src: "", poster: "", label: "Evento",  caption: "", exemplo: true }
    ],
    tune: [
      { type: "video", src: "", poster: "", label: "Ao vivo", caption: "", exemplo: true }
    ]
  },

  /* Playlist da AdonaiTune (as músicas da rádio, separadas da transmissão ao vivo).
     src: o link direto do arquivo de áudio (.mp3). Sem o link, a música aparece na lista mas sem o botão de tocar.
     Envie os arquivos das 7 músicas para o Claude no chat, ou cole os links delas já publicados. */
  playlist: [
    { title: "Música 1", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 2", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 3", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 4", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 5", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 6", artist: "AdonaiTune", src: "", exemplo: true },
    { title: "Música 7", artist: "AdonaiTune", src: "", exemplo: true }
  ],

  /* Redes sociais. Cole o endereço em url. Enquanto estiver vazio, o botão aparece como "em breve".
     rede: instagram, facebook, youtube, whatsapp ou tiktok. */
  social: {
    shalom: [
      { rede: "instagram", nome: "Instagram", url: "" },
      { rede: "facebook",  nome: "Facebook",  url: "" },
      { rede: "youtube",   nome: "YouTube",   url: "" },
      { rede: "whatsapp",  nome: "WhatsApp",  url: "" },
      { rede: "tiktok",    nome: "TikTok",    url: "" }
    ],
    tune: [
      { rede: "instagram", nome: "Instagram", url: "" },
      { rede: "facebook",  nome: "Facebook",  url: "" },
      { rede: "youtube",   nome: "YouTube",   url: "" },
      { rede: "whatsapp",  nome: "WhatsApp",  url: "" },
      { rede: "tiktok",    nome: "TikTok",    url: "" }
    ]
  }
};
