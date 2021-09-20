const { Client, VoiceChannel, Intents } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { dictVoiceCommands, dictAdmins } = require("../utils");

const spam = require("spamnya");
const player = createAudioPlayer();
player.on(AudioPlayerStatus.Idle, () => {});
function playSong(sound, volume, connection) {
  const resource = createAudioResource(sound, {
    inputType: StreamType.Arbitrary,
    inlineVolume: true,
  });

  resource.volume.setVolume(volume);
  player.play(resource);
  return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
    return connection;
  } catch (error) {
    connection.destroy();
    throw error;
  }
}

module.exports = {
  voice: async function voice(command, message, blackList) {
    spam.log(message, 50);
    const author = message.author.id;
    if (spam.sameMessages(4, 10000)) {
      blackList.push(author);
      setInterval(function () {
        blackList = [];
      }, 10000);
      message.channel.send("Pochini malko baluk");
      var voice = message.guild.members.cache.find(
        (user) => user.id === author
      ).voice;
      if (!voice) return;
      await voice.disconnect();
      return;
    }
    var volume = command == "eitypag" && dictAdmins.includes(author) ? 200 : 2;
    const channel = message.member?.voice.channel;
    if (channel) {
      try {
        const connection = await connectToChannel(channel);
        connection.subscribe(player);
        playSong(dictVoiceCommands[command], volume, connection);
        message.reply("Playing now!");
        player.on(AudioPlayerStatus.Idle, () => {
          try {
            connection.destroy();
          } catch (error) {
            // console.error(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      message.reply("Join a voice channel then try again!");
    }

    // voiceChannel
    //   .join()
    //   .then((connection) => {
    //     const dispatcher = connection.play(dictVoiceCommands[command], {
    //       volume: volume,
    //     });
    //     dispatcher.on("finish", (end) => voiceChannel.leave());
    //     dispatcher.on("error", console.error);
    //   })
    //   .catch((err) => console.log(err));
  },
};
