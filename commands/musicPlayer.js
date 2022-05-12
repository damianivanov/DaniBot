const { RepeatMode } = require("discord-music-player");
const { MessageEmbed } = require('discord.js');

async function musicPlayer(message,client){
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift();
    let guildQueue = client.player.getQueue(message.guild.id);

    if(command === 'play') {
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    // console.log(queue.songs);
    
    //  message.channel.send(`zareden banger: ${song.name}`);
    
        const songEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(song.name)
	.setURL(song.url)
	.setThumbnail(song.thumbnail)
	// .addFields(
	// 	{ name: 'Regular field title', value: 'Some value here' },
	// 	{ name: '\u200B', value: '\u200B' },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// )
	.addField('Duration:', `${song.duration}`, true)
	.setImage(song.thumbnail)
	.setTimestamp()
	.setFooter('ZAREDEN BANGER')
    ;

message.channel.send({ embeds: [songEmbed] });

    }

    else if(command === 'playlist') {
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    }

    else if(command === 'skip') {
        guildQueue.skip();
    }

    else if(command === 'stop') {
        guildQueue.stop();
    }

    else if(command === 'removeLoop') {
        guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
    }

    else if(command === 'toggleLoop') {
        guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
    }

    else if(command === 'toggleQueueLoop') {
        guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
    }

    else if(command === 'setVolume') {
        guildQueue.setVolume(parseInt(args[0]));
    }

    else if(command === 'seek') {
        guildQueue.seek(parseInt(args[0]) * 1000);
    }

    else if(command === 'clearQueue') {
        guildQueue.clearQueue();
    }

    else if(command === 'shuffle') {
        guildQueue.shuffle();
    }

    else if(command === 'getQueue') {
        console.log(guildQueue);
    }

    else if(command === 'getVolume') {
        console.log(guildQueue.volume)
    }

    else if(command === 'nowPlaying') {
        console.log(`Now playing: ${guildQueue.nowPlaying}`);
    }

    else if(command === 'pause') {
        guildQueue.setPaused(true);
    }

    else if(command === 'resume') {
        guildQueue.setPaused(false);
    }

    else if(command === 'remove') {
        guildQueue.remove(parseInt(args[0]));
    }

    else if(command === 'createProgressBar') {
        const ProgressBar = guildQueue.createProgressBar();
        
        // [======>              ][00:35/2:20]
        console.log(ProgressBar.prettier);
    }
    
}

module.exports.MusicPlayer = musicPlayer;