require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

const lastBan = new Date('2/5/2021');
client.once('ready', () => {
    console.log('DaniBot is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'dani') {
        const today = new Date();
        const diffTime = Math.abs(lastBan - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        message.channel.send(diffDays + ' days since the last ban! Keep it up 🙂');
    }
    else if (command == 'tilted') {
        message.channel.send('https://on-winning.com/avoid-tilt/');
    }
    else if (command == 'cringe') {
        const list = '1 Death Note. 9.98 / 10\n' + 
                     '2 Fullmetal Alchemist: Brotherhood. 9.59 / 10\n' +
                     '3 Naruto. 9.31 / 10\n' +
                     '4 Attack on Titan. 9.74 / 10.\n' +
                     '5 Dragon Ball Z. 9.15 / 10';
        message.channel.send(list);
    }
    else if (command=='info'){
        const commands = 'Supported Commands:\n'+
                        '-Dani - Days since last ban\n' + 
                        '-tilted - Article for avoiding tilt \n' + 
                        '-cringe - C R I N G E (Top 5 An*mes)\n' +
                        '-chill - TOP VIBES';

        message.channel.send(commands);
    }
    else if (command == 'chill')
    {   
        const command = 'https://www.youtube.com/watch?v=einR_rqDICU&ab_channel=YordanAngelov';
        message.channel.send(command);
    }
    else if (command == 'stream'){
        const user = args[0];
	    if (!user) return;

        const command = user +' https://media.discordapp.net/attachments/318116226838822912/788480519728922714/puskai-striim.gif'
        message.channel.send(command);
    }
    else if (command == 'rank1' && args[0]=='vlad'){

        const command = 'https://eune.op.gg/summoner/userName=Vlad2MeetYou 🧢'
        message.channel.send(command);
    }
});
client.login(process.env.token);