function deleteChannel(msg) {
    let splitmsg = msg.content.split(' ');

    let type = splitmsg[1];
    if (type !== 'voice' && type !== 'text' && type !== 'category' && type !== '*') {
        msg.channel.send(`I cannot delete channel of type: ${type}. Use [text / voice / category] instead. `)
    } else {
        splitmsg = splitmsg.slice(2);
        let paramsNames = splitmsg.join(" ");
        let channelNames = paramsNames.split(',');
        let result;

        //DELETE ALL VOICE/TEXT AND CATEGORIES CHANNELS
        if (type === "*") {
            result = msg.guild.channels.cache.filter(channel => (channel.type === "voice" || channel.type === "text" || channel.type === "category")).array();
            for (const channel of result) {
                channel.delete();
            }
        }

        if (channelNames.length === 1 && channelNames[0] === "*") {
            result = msg.guild.channels.cache.filter(channel => channel.type === type).array();
            for (const channel of result) {
                channel.delete();
            }
        } else {
            for (const name of channelNames) {
                result = msg.guild.channels.cache.find(channel => (channel.type === type && channel.name === name));
                if (result) {
                    result.delete();
                }
            }
        }
    }
    msg.reply("Operation is done");
}

module.exports = {deleteChannel}