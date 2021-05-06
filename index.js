const Discord = require('discord.js');
const {kicker} = require("./Functionality/kicker");
const {TOKEN, prefix} = require('./Environment');

/**
 * Functionalities
 */
const {welcome} = require('./Functionality/welcome')
const {help} = require('./Functionality/help')

const {createChannel} = require('./Functionality/createChannel')
const {deleteChannel} = require('./Functionality/deleteChannel')
const {saveBackupGuild, loadBackupGuild} = require("./Functionality/backup");
const {kick, ban} = require("./Functionality/kick");

//CREATE A NEW DISCORD CLIENT
const client = new Discord.Client();
let Guilds;

//BOT LOGIN AND PRINT BOT NAME#DISCRIMINATOR
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    Guilds = client.guilds.cache.map(guild => guild);
    // console.log(Guilds);
});

client.on("guildCreate", guild => {
    try{
        let id = guild.systemChannelID;
        const channel = guild.channels.cache.find(channel => channel.id === id);
        welcome(channel);
        console.log("Joined a new guild: " + guild.name);
    }catch (e) {
        console.log(`I joined ${guild.name} and there is no system channel`);
    }
})

//BOT RESPONSES ON MESSAGES
client.on('message', msg => {

    /**
     * BOT TEST
     */
    if (msg.content === `${prefix}ping`) {
        msg.reply('Pong!');
    }

    /**
     * Help card
     */

    //TODO: help - link to website
    if(msg.content === `${prefix}help`){
        help(msg);
    }

    /**
     * Welcome card
     */
    if(msg.content === `${prefix}welcome`){
        welcome(msg.channel);
    }

    /**
     * Create new voice/text channel, category
     */
    if (msg.content.startsWith(`${prefix}create`)) {
        createChannel(msg);
    }

    /**
     * Delete voice/text channel, category
     */
    if (msg.content.startsWith(`${prefix}delete`)) {
        deleteChannel(msg);
    }

    /**
     * Make a backup
     */
    if(msg.content === `${prefix}backup`){
        saveBackupGuild(msg);
    }

    /**
     * Load a backup
     */
    if(msg.content.startsWith(`${prefix}load`)){
        loadBackupGuild(msg);
    }

    /**
     * Kick user from the server
     */
    if(msg.content.startsWith(`${prefix}kick`)){
        kick(msg);
    }

    /**
     * Ban user from the server
     */
    if(msg.content.startsWith(`${prefix}ban`)){
        ban(msg);
    }

    /**
     * Move user around channels
     */
    if (msg.content.startsWith(`${prefix}kicker`)) {
        kicker(msg);
    }



    //disconnect user from channel
    //send info about user
    //meme api
    //joke -move user around voice channels



});

//LOGIN CLIENT USING TOKEN
client.login(TOKEN);