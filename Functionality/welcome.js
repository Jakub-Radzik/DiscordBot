const Discord = require("discord.js");
const {name, version} = require('../package.json');

/**
 * Embed Discord.JS Help Card
 * @type {module:"discord.js".MessageEmbed}
 */
const welcomeEmbed = new Discord.MessageEmbed()
    .setColor('#ffff00')
    .setTitle(`${name} ${version}`)
    // .setURL('https://discord.js.org/')
    .setAuthor('Created by Jakub Radzik', 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/55882011_1527938227341122_7003640738219032576_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=TqU-qydleb8AX-HvQMi&_nc_ht=scontent-waw1-1.xx&oh=9f8aef09c5a3e39b59b52a0551a170dc&oe=60B26354', 'https://jakub-radzik.pl')
    .addField('About Bot', 'Simple discord bot using JavaScript. \nAll functionality under command: `;help`', true)
    .attachFiles(['./images/bot_avatar.png','./images/node.png'])
    .setThumbnail('attachment://node.png')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Bot code', value: 'See [github repo](https://github.com/radzikoska123/DiscordBot)\nVisit [homepage](https://github.com/radzikoska123/DiscordBot)' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Find me on', value: '[LINKEDIN](https://www.linkedin.com/in/jakub-radzik-726682174/)\n[GITHUB](https://github.com/radzikoska123)', inline: true },
    )
    .setImage('attachment://bot_avatar.png')
    .setTimestamp()
    // .setFooter('Buy me a beer', 'https://i.imgur.com/wSTFkRM.png');
    .setFooter('Buy me a beer');

function welcome(channel){
    channel.send(welcomeEmbed);
}

module.exports = {welcome}