function kicker(msg){
    try{
        const user = msg.mentions.members.first();
        let voiceChannels = msg.guild.channels.cache.filter(c => c.type === 'voice');
        let channelsLength = voiceChannels.size;
        if (user) {
            const member = msg.guild.members.resolve(user);
            voiceChannels.each(channel => setTimeout(() => {
                member.voice.setChannel(channel);
            },100))
        }
    }catch (e) {
        msg.channel.send("Error occured")
    }
}

module.exports = {kicker}