const Discord = require('discord.js');
const {TOKEN} = require('./BotKey');

//CREATE A NEW DISCORD CLIENT
const client = new Discord.Client();

//BOT LOGIN AND PRINT BOT NAME#DISCRIMINATOR
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//BOT RESPONSES ON MESSAGES
client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

//LOGIN CLIENT USING TOKEN
client.login(TOKEN);