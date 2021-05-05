const Discord = require('discord.js');
const {TOKEN, prefix} = require('./Environment');

/**
 * Functionalities
 */
const {welcome} = require('./Functionality/welcome')
const {help} = require('./Functionality/help')

const {createChannel} = require('./Functionality/createChannel')
const {deleteChannel} = require('./Functionality/deleteChannel')


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

    //TODO: help - link to website
    //TODO: copy channel IMPORTANT
    //disconnect user from channel
    //ban user
    //kick user
    //send info about user

    if (msg.content.startsWith("kick")) {
        let user = msg.mentions.members.first();

        if (user) {
            const member = msg.guild.members.resolve(user);
            member.kick().then((member) => {
                msg.channel.send('Sectum Sempra !!!', {
                    files: [
                        "./sectumSempra.gif"
                    ]
                });
                msg.channel.send(":wave: " + member.displayName + " został wyrzucony :point_right: ");
            }).catch(() => {
                msg.channel.send("I do not have permissions to do this");
            });
        }
    }

    if (msg.content.startsWith("ban")) {
        let user = msg.mentions.members.first();


        //TODO: CHECK UPRAWNIENIA DO BANOWANIA


        if (user) {
            const member = msg.guild.members.resolve(user);
            member.ban().then((member) => {
                msg.channel.send('Avada Kedavra !!!', {
                    files: [
                        "./avadaKedavra.gif"
                    ]
                });
                msg.channel.send(":wave: " + member.displayName + " został zbanowany :point_right: ");
            }).catch(() => {
                msg.channel.send("I do not have permissions to do this");
            });
        }
    }

    //meme api
    //joke -move user around voice channels
    if (msg.content.startsWith("kicker")) {
        const user = msg.mentions.members.first();
        let voiceChannels = msg.guild.channels.cache.filter(c => c.type === 'voice');
        let channelsLength = voiceChannels.size;
        if (user) {
            const member = msg.guild.members.resolve(user);
            voiceChannels.each(channel => setTimeout(() => {
                member.voice.setChannel(channel);
            },100))
        }
    }

});

//LOGIN CLIENT USING TOKEN
client.login(TOKEN);