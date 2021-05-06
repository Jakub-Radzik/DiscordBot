function ban(msg){
    let user = msg.mentions.members.first();

    if(!msg.member.hasPermission("BAN_MEMBERS")){
        return msg.channel.send(":x: | You don't have permissions!");
    }

    if (user) {
        const member = msg.guild.members.resolve(user);
        member.ban().then((member) => {
            msg.channel.send(":wave: " + member.displayName + " has been banned :point_right: ");
        }).catch(() => {
            msg.channel.send("I do not have permissions to do this");
        });
    }
}

module.exports = {ban}