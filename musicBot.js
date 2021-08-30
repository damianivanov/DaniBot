const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const prefix = "-";

const queue = new Map();

async function MusicBot(message) {
  if (message.author.bot) return;
//queue = <string,[songs]> 
  const serverQueue = queue.get(message.guild.id);
  // p --> play , n --> next, s--> clear
  if (message.content.startsWith(`${prefix}p`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}n`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}c`)) {
    clear(message, serverQueue);
    return;
  }
}

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

    //basic search by word
  var query = args[1];
  if (!args[1].includes("https://")) {
    args.shift();
    query = args.join(" ");
    const firstResult = await ytsr(query, { pages: 1 });
    query = firstResult.items[0].url;
    //console.log(firstResult.items[0]);
    //console.log(firstResult.items[0].url);
  } 
  else if (query.includes("&list=")) {
    const playlist = await ytpl(query);

    
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };
      queue.set(message.guild.id, queueContruct);
      serverQueue=queue.get(message.guild.id) // <---
    }

    for (const song of playlist.items) {
      //const songInfo = await ytdl.getInfo(query); might be fucked up
      const songFromPlaylist = {
        title: song.title,
        url: song.shortUrl,
      };
      serverQueue.songs.push(songFromPlaylist);
    }
    try {
      var connection = await voiceChannel.join();
      serverQueue.connection = connection;
      play(message.guild, serverQueue.songs[0]);
      return message.channel.send(`${playlist.items.length} queued up, pomqr`)
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message. channel.send(err);
    }
    

  }
  //direct url
  else if (ytdl.validateURL(query)) {
    const songInfo = await ytdl.getInfo(query);
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  } else {
    return message.channel.send("Prost li si kuv si ?");
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("TI PROST LI IS???? NE VIJDASH LI CHE NQMA POVECHE PESNI!");
  serverQueue.connection.dispatcher.end();
}

function clear(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );

  if (!serverQueue)
    return message.channel.send("TI PROST LI IS???? NE VIJDASH LI CHE NQMA POVECHE PESNI!");

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  setInterval(function () {
    serverQueue.voiceChannel.leave();
  }, 300000);
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    setInterval(function () {
      serverQueue.voiceChannel.leave();
    }, 300000);
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`V momenta bi4i: **${song.title}**`);
}

module.exports.MusicBot = MusicBot;
