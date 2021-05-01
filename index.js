const Discord = require('discord.js');
const {TOKEN} = require('./BotKey');

/**
 * Functionalities
 */
const {welcome} = require('./Functionality/welcome')

//CREATE A NEW DISCORD CLIENT
const client = new Discord.Client();
let Guilds;

//BOT LOGIN AND PRINT BOT NAME#DISCRIMINATOR
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    Guilds = client.guilds.cache.map(guild => guild);
    console.log(Guilds);
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

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    //create new voice channel
    if (msg.content.startsWith('create new voice')) {
        let splitmsg = msg.content.split(' ');
        let newVoiceChannelName = '';
        for (let i = 3; i < splitmsg.length; i++) {
            newVoiceChannelName+=`${splitmsg[i]} `;
        }
        newVoiceChannelName.trim();
        console.log(newVoiceChannelName)
        msg.guild.channels.create(newVoiceChannelName, {
            type: "voice",
            permissionOverwrites: [
                {
                    id: msg.guild.roles.everyone,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                }
            ],
        })
    }
    //help - link to website
    //disconnect user from channel
    //ban user
    //kick user
    //send info about user
    if(msg.content === 'welcome'){
        welcome(msg.channel);
    }

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

        // try{
        //     if(user.user.username === "Jakub Radzik"){
        //         user = msg.author;
        //     }
        // }catch (e) {
        //     console.log(e);
        // }

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
    //joke -move user around channels
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
    console.log("end")





});

//LOGIN CLIENT USING TOKEN
client.login(TOKEN);