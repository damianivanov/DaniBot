require('dotenv').config();
var inf = require('./info');
var dani = require('./dani');
var cringe = require('./animeList');
var playlist = require('./chill');
var daniTime = require('./timeDani');
const opusscript = require('opusscript');
const Discord = require('discord.js');
var dictAdmins = ['378275337164816394', '163416315892072448'];

const { LockableClient } = require('./lockable-client');
const bot = new LockableClient();

const client = new Discord.Client();
const prefix = '-';
var dictLosersQueue = { '378275337164816394': 0 };
var dictWinnersQueue = { '378275337164816394': 0 };
var dictVoiceCommands = { 'imali': './imali.mp3', 'monitor': './Im_gonna_break_my_monitor.mp3', 'eitypag': './ei_typag.mp3' }

client.once('ready', () => {
    console.log('DaniBot is online!');
});




client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'dani') {
        message.channel.send(dani.lastBan());
    }
    else if (command == 'tilted') {
        message.channel.send('https://on-winning.com/avoid-tilt/');
    }
    else if (command == 'cringe') {
        message.channel.send(cringe.list());
    }
    else if (command == 'info') {
        message.channel.send(inf.info());
    }
    else if (command == 'chill') {
        message.channel.send(playlist.chill());
    }
    else if (command == 'stream') {
        const user = args[0];
        if (!user) return;
        const userid = user.match(/[0-9]+/g)[0];
        var currUser = client.users.cache.find(user => user.id === userid);
        if (!currUser) return;
        var status = currUser.presence.status;
        if (status == 'online' || status == 'idle') {

            message.channel.send(user);
            if (user == "<@!374199399146061836>") {
                message.channel.send("You can also try - https://www.twitch.tv/gnoyl9375");
            }
            else if (user == "<@!214072494737457152>") {
                var voice = message
                    .guild
                    .members
                    .cache
                    .find(user => user.id === userid).voice;

                if (voice && voice.streaming) {
                    message.channel.send("vlizai ku4e");
                    message.channel.send("https://media1.tenor.com/images/4e14ace0fffd89910d2bd2496a68c848/tenor.gif?itemid=20801017")
                    return
                }
                else {
                    message.channel.send("Probvai tuk: https://www.twitch.tv/freewaydani");
                };

            };

            message.channel.send('https://media.tenor.com/images/037ad7fd2f75a122c29f25f241b2770d/tenor.gif');
        }
        else
            message.channel.send(user + " is 🔨 his 🥩");
    }
    else if (command == 'rank1' && args[0] == 'vlad') {
        const command = 'https://eune.op.gg/summoner/userName=Vlad2MeetYou 🧢'
        message.channel.send(command);
    }
    else if (command == 'mm') {
        var number = (Math.floor(Math.random() * 100)) % 2;
        var options = ["Losers Queue", "Winners Queue"];
        var option = options[number];
        var user = message.member.user.id;
        message.channel.send(option);

    }
    else if (command == 'newyear') {
        const command = 'https://pubmed.ncbi.nlm.nih.gov/7396691/'

        message.channel.send('Не сте сами! <@!214072494737457152>  <@!374199399146061836> ');

        message.channel.send(command);
    }
    else if (command == 't') {
        message.channel.send(daniTime.timeOfday())
    }
    else if (command == 'motto') {
        message.channel.send("Dani's life moto is - My life is a party, my home is the club!");
    }
    else if (command == "pochwame") {
        message.channel.send('zdr, da znae6 4e', {
            files: [
                "./start.png"
            ]
        });
    }
    else if (command == "res") {
        const author = message.author.id;
        if (!dictAdmins.includes(author)) {
            message.channel.send("You are not in the big dick club");
            return;
        }
        const user = args[0];
        if (!user) return;
        const userid = user.match(/[0-9]+/g)[0];
        var currUser = client.users.cache.find(user => user.id === userid);
        if (!currUser) return;
        var voice = message
            .guild
            .members
            .cache
            .find(user => user.id === userid).voice;

        if (!voice) return;

        if (!dictAdmins.includes(voice.member.user.id)) {
            await voice.kick();
        }
    }
    else if (command == "nightmare") {
        message.channel.send('https://media.tenor.com/images/037ad7fd2f75a122c29f25f241b2770d/tenor.gif');
    }
    else if ((command in dictVoiceCommands) && !bot.isLocked()) {
        const author = message.author;
        var volume = 2;
        if (command == 'eitypag' && (author.username == "damian.iv" || author.username == "Velirax")) {
            volume = 200;
        }
        bot.lock();
        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            message.channel.send("You have to be in voice 4annel be typak");
        }
        else {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(dictVoiceCommands[command], { volume: volume });
                dispatcher.on('finish', end => voiceChannel.leave());
            }).catch(err => console.log(err))
            bot.unlock()
        }
    }
});



client.login(process.env.token);