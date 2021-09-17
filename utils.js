var inf = require("./commands/infoCommand");
var playlist = require("./commands/chillCommand");
const { mm } = require("./commands/helperFunctions");

const dictVoiceCommands = {
  imali: "./sounds/imali.mp3",
  monitor: "./sounds/Im_gonna_break_my_monitor.mp3",
  eitypag: "./sounds/ei_typag.mp3",
  papi: "./sounds/chupapi_short.mp3",
  kofti: "./sounds/kaksheekofti.mp3",
  badboy: "./sounds/badboy.mp3",
};

var dictCommands = {
  nightmare:
    "https://media1.tenor.com/images/4e14ace0fffd89910d2bd2496a68c848/tenor.gif?itemid=20801017",
  info: inf.info(),
  chill: playlist.chill(),
  motto: "Dani's life moto is - My life is a party, my home is the club!",
  newyear:
    "Не сте сами! <@!214072494737457152>  <@!374199399146061836> " +
    " https://pubmed.ncbi.nlm.nih.gov/7396691/",
  pochwame: { files: ["./start.png"] },
};
const musicBotCommands = [
  "play",
  "playlist",
  "skip",
  "stop",
  "removeLoop",
  "toggleLoop",
  "setVolume",
  "seek",
  "clearQueue",
  "shuffle",
  "getQueue",
  "getVolume",
  "nowPlaying",
  "pause",
  "resume",
  "remove",
  "createProgressBar",
];

var dictAdmins = ["378275337164816394", "163416315892072448"];

module.exports = {
  musicBotCommands: musicBotCommands,
  dictCommands: dictCommands,
  dictVoiceCommands: dictVoiceCommands,
  dictAdmins: dictAdmins,
};
