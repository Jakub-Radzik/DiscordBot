const Discord = require("discord.js");
const {name, version} = require('../package.json');
const {prefix} = require('../Environment')

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#00ccff')
    .setTitle(`${name} ${version}`)
    // .setURL('https://discord.js.org/')
    // .setAuthor('Created by Jakub Radzik', 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/55882011_1527938227341122_7003640738219032576_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=TqU-qydleb8AX-HvQMi&_nc_ht=scontent-waw1-1.xx&oh=9f8aef09c5a3e39b59b52a0551a170dc&oe=60B26354', 'https://jakub-radzik.pl')
    // .addField('Help', 'Simple discord bot using JavaScript. \nAll functionality under command: `;help`', true)
    .attachFiles(['./images/bot_avatar.png'])
    .setThumbnail('attachment://bot_avatar.png')
    .addFields(
        {name: '\u200B', value: '\u200B'},
        {name: '**OVERVIEW**', value: 'Information commands'},
        {name: `\`${prefix}help\``, value: 'Show help'},
        {name: `\`${prefix}welcome\``, value: 'Show information about bot and author'},
        {name: '\u200B', value: '\u200B'},
        {name: '**MENAGEMENT**', value: 'Channels, categories menagement commands'},
        {name: `\`${prefix}create {type} {names,}\``, value: 'Create text/voice channels or categories'},
        {name: `\`${prefix}delete {type} {names,}\``, value: 'Delete text/voice channels or categories'},
        {name: '\u200B', value: '\u200B'},
        {name: '**JOKES**', value: 'Some jokes on your mates'},
        {name: `\`${prefix}kicker @mention\``, value: 'Move your friend around all voice channels in your guild, works only on connected users'},
        {name: '\u200B', value: '\u200B'},
        {name: '**PARAMETERS LIST**', value: 'List of example params in commands'},
        {name: `{type}`, value: 'voice, text, category'},
        {name: `{names,}`, value: 'Names separated by commas'},
        {name: `@mention`, value: 'Mentioned user'},
    )
    .setTimestamp()
    .setFooter('Enjoy', 'https://i.imgur.com/wSTFkRM.png');

function help(msg) {
    msg.channel.send(helpEmbed);
}

module.exports = {help}
