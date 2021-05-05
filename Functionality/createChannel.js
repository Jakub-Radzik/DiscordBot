function createChannel(msg){

    let splitmsg = msg.content.split(' ');

    let type = splitmsg[1];
    if( type!=='voice' &&  type!=='text' && type!=='category' ){
        msg.channel.send(`I cannot create channel of type: ${type}. Use [text / voice / category] instead. `)
    }else{
        splitmsg = splitmsg.slice(2);
        let paramsNames = splitmsg.join(" ");
        let channelNames = paramsNames.split(',');
        for (const name of channelNames) {
            /**
             * CREATE NEW CHANNEL
             */
            msg.guild.channels.create(name.trim(), {
                type: type,
                permissionOverwrites: [
                    {
                        id: msg.guild.roles.everyone,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    }
                ],
            })
        }
    }

    msg.reply("Operation is done");
}

module.exports={createChannel}


