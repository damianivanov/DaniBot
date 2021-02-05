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
        message.channel.send(diffDays + ' days since last ban! Keep it up    :)');
    }
    else if (command == 'tilted') {
        message.channel.send('https://on-winning.com/avoid-tilt/');
    }
    else if (command == 'cringe') {
        const list = '1 Fullmetal Alchemist: Brotherhood (TV)    9.09    5833\n' + 
                     '2 your name. (movie)    9.05    1118\n' +
                     '3 Clannad After Story (TV)    9.05    5182\n' +
                     '4 Steins;Gate (TV)    9.05    4672\n' +
                     '5 Rurouni Kenshin: Trust & Betrayal (OAV)    8.97    6654';
        message.channel.send(list);
    }
    else if (command=='info'){
        const commands = 'Supported Commands:\n'+
                        '-Dani - Days since last ban\n' + 
                        '-tilted - Article for avoiding tilt \n' + 
                        '-cringe - C R I N G E (Top 5 An*mes)';
        message.channel.send(commands);
    }
    else if (command == 'antitilt')
    {   
        const command = '-p https://www.youtube.com/watch?v=einR_rqDICU&ab_channel=YordanAngelov';
        message.channel.send(command);
    }
});
client.login(process.env.TOKEN);