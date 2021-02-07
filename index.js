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
        const diffDays = Math.ceil((diffTime + (1000*60*60*3)) / (1000 * 60 * 60 * 24));
        console.log(today);
        message.channel.send(diffDays-1 + ' days since the last ban! Keep it up 🙂');
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
                        '-chill - TOP VIBES\n' +
                        '-stream @username - PUSKAI STREAM WE\n' +
                        '-rank1 vlad - RANK1 VLAD HEAVY 🧢 \n' +
                        '-mm - Check if you are in Losers or Winners Queue(using Algebra 2 and algorithms from NASA)';

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
        message.channel.send(user);
        message.channel.send('https://media.tenor.com/images/037ad7fd2f75a122c29f25f241b2770d/tenor.gif');
    }
    else if (command == 'rank1' && args[0]=='vlad'){
        const command = 'https://eune.op.gg/summoner/userName=Vlad2MeetYou 🧢'
        message.channel.send(command);
    }
    else if(command == 'mm'){
        var number = (Math.floor(Math.random() * 100))%2;
        var options = ["Losers Queue","Winners Queue"];
        message.channel.send(options[number]);
    }
});
client.login(process.env.token);