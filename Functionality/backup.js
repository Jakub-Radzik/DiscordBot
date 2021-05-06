const backup = require('discord-backup');
const path = require('path');

backup.setStorageFolder(path.resolve(__dirname, '../backup/'));

let options = {
    jsonBeautify: true
}

function saveBackupGuild(msg) {
    backup.create(msg.guild, options).then((backupData) => {
        msg.channel.send(backupData.id);
    });
}

function loadBackupGuild(msg){

    if(!msg.member.hasPermission("ADMINISTRATOR")){
        return msg.channel.send(":x: | You must be an administrator of this server to load a backup!");
    }

    let backupID = msg.content.split(" ")[1];

    backup.fetch(backupID).then(async () => {
        msg.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `;confirm` to confirm!");
        await msg.channel.awaitMessages(m => (m.author.id === msg.author.id) && (m.content === ";confirm"),
            {
            max: 1,
            time: 20000,
            errors: ["time"]
            }
        ).catch((err) => {
            return msg.channel.send(":x: | Time's up! Cancelled backup loading!");
        });

        await msg.author.send(":white_check_mark: | Start loading the backup!");

        backup.load(backupID, msg.guild).then(() => {
            backup.remove(backupID);
        }).catch((err) => {
            return msg.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
        });
    }).catch((err) => {
        console.log(err);

        return msg.channel.send(":x: | No backup found for `"+backupID+"`!");
    });
}

module.exports = {
    saveBackupGuild: saveBackupGuild,
    loadBackupGuild: loadBackupGuild
};