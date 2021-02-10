require('dotenv').config();
var inf = require('./info');
var dani = require('./dani');
var cringe = require('./animeList');
var playlist = require('./chill');
var daniTime = require('./timeDani');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
var dictLosersQueue = {'378275337164816394':0};
var dictWinnersQueue = {'378275337164816394':0};
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
    else if (command == 'chill'){   
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
        var option = options[number];
        var user = message.member.user.id;
        message.channel.send(option);
        
        // if(option == "Losers Queue"){
        //     if (isNaN(dictLosersQueue[user])) {
        //         dictLosersQueue[user]=0;
        //     }
        //     dictLosersQueue[user]+=1;
        //     console.log(`Losers Queue for ${message.member.user.username} is ${dictLosersQueue[user]}`);
        // }
        // else{
        //     if (isNaN(dictWinnersQueue[user])) {
        //         dictWinnersQueue[user]=0;
        //     }
        //     dictWinnersQueue[user]+=1;
        //     console.log(`Winners Queue for ${message.member.user.username} is ${dictWinnersQueue[user]}`);   
        // }
    }
    else if(command == 'newyear'){
        const command = 'https://pubmed.ncbi.nlm.nih.gov/7396691/'
        
        message.channel.send('Не сте сами! <@!214072494737457152>  <@!374199399146061836> ');
       
        message.channel.send(command);
    }
    else if(command == 't'){
        message.channel.send(daniTime.timeOfday())
    }
    else if(command == 'motto'){
        message.channel.send("Dani's life moto is - My life is a party, my home is the club!");
    }
});
client.login(process.env.token);