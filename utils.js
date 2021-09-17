var cringe = require("./animeList");
var inf = require("./info");
var playlist = require("./chill");

const dictVoiceCommands = {
  imali: "./imali.mp3",
  monitor: "./Im_gonna_break_my_monitor.mp3",
  eitypag: "./ei_typag.mp3",
  papi: "./chupapi_short.mp3",
  kofti: "./kaksheekofti.mp3",
  badboy: "./badboy.mp3",
};

const dictCommands = {
  tilted: "https://on-winning.com/avoid-tilt/",
  cringe: cringe.list(),
  info: inf.info(),
  chill: playlist.chill(),
  rank1: "https://eune.op.gg/summoner/userName=Vlad2MeetYou 🧢",
  motto: "Dani's life moto is - My life is a party, my home is the club!",
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
