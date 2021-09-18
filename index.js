require("dotenv").config();
const dani = require("./commands/daniCommand");
const { stream } = require("./commands/streamCommand");
const { Client, Intents } = require("discord.js");
const { Player } = require("discord-music-player");
const {
  dictCommands,
  musicBotCommands,
  dictVoiceCommands,
} = require("./utils");
const { createAudioPlayer } =require("@discordjs/voice");
const { mm, sendInvite, magic } = require("./commands/helperFunctions");
const { LockableClient } = require("./lockable-client");
const { MusicPlayer } = require("./commands/musicPlayer");
const streamCommand = require("./commands/streamCommand");
const { voice } = require("./commands/voiceCommands");
const bot = new LockableClient({ intents: new Intents(32767) });
const client = new Client({ intents: new Intents(32767) });
const player = new Player(client, {
  leaveOnEmpty: true,
});
client.player = player;
const prefix = "-";
var blackList = [];

client.once("ready", () => {
  console.log("DaniBot is online!");
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (musicBotCommands.includes(command)) {
    MusicPlayer(message, client);
  } else if (command === "dani") {
    message.channel.send(dani.lastBan());
  } else if (command === "stream") {
    stream(message, args);
  } else if (command in dictCommands) {
    message.channel.send(dictCommands[command]);
  } else if (command === "mm") {
    message.channel.send(mm());
  } else if (
    command in dictVoiceCommands &&
    !(message.author.id in blackList)
  ) {
    voice(command, message, blackList);
  } else if (command === "magic") {
    magic(message);
  } else if (command === "invite") {
    sendInvite(message, client);
  }
});

client.login(process.env.token);

//play sound on join
// client.on("voiceStateUpdate", (oldState, newState) => {
//   var voiceChannel = newState.channel;
//   let oldChannel = oldState.channel
//   let newChannel = newState.channel

//   if (oldChannel === newChannel) return;

//   if (
//     oldState.member.user.id === "378275337164816394" &&
//     voiceChannel &&
//     !bot.isLocked()
//   ) {
//     bot.lock();
//     voiceChannel
//       .join()
//       .then((connection) => {
//         const dispatcher = connection.play(dictVoiceCommands["papi"], {
//           volume: 1,
//         });
//         dispatcher.on("finish", (end) => voiceChannel.leave());
//         dispatcher.on("error", console.error);
//       })
//       .catch((err) => console.log(err));
//     bot.unlock();
//   }
// });
