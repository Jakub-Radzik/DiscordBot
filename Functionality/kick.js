function kick(msg){
    let user = msg.mentions.members.first();

    if(!msg.member.hasPermission("KICK_MEMBERS")){
        return msg.channel.send(":x: | You don't have permissions!");
    }

    if (user) {
        const member = msg.guild.members.resolve(user);
        member.kick().then((member) => {
            msg.channel.send(":wave: " + member.displayName + " has been kicked from the server :point_right: ");
        }).catch(() => {
            msg.channel.send("I do not have permissions to do this");
        });
    }
}

module.exports = {kick}