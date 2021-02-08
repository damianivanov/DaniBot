require('dotenv').config();
var inf = require('./info');
var dani = require('./dani');
var cringe = require('./animeList');
var playlist = require('./chill');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';


client.once('ready', () => {
    console.log('DaniBot is online!');
});

client.on('message', message => {
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
    else if (command=='info'){
        message.channel.send(inf.info());
    }
    else if (command == 'chill')
    {   
        
        message.channel.send(playlist.chill());
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
    else if(command == 'newyear'){
        const command = 'https://pubmed.ncbi.nlm.nih.gov/7396691/'
        
        message.channel.send('Не сте сами! <@!214072494737457152>  <@!374199399146061836> ');
       
        message.channel.send(command);
    }
});
client.login(process.env.token);