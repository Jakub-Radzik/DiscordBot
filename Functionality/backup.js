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
        // If the backup exists, request for confirmation
        msg.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `;confirm` to confirm!");
        await msg.channel.awaitMessages(m => (m.author.id === msg.author.id) && (m.content === ";confirm"), {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).catch((err) => {
            // if the author of the commands does not confirm the backup loading
            return msg.channel.send(":x: | Time's up! Cancelled backup loading!");
        });
        // When the author of the command has confirmed that he wants to load the backup on his server
        await msg.author.send(":white_check_mark: | Start loading the backup!");
        // Load the backup
        backup.load(backupID, msg.guild).then(() => {
            // When the backup is loaded, delete them from the server
            backup.remove(backupID);
        }).catch((err) => {
            // If an error occurred
            return msg.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
        });
    }).catch((err) => {
        console.log(err);
        // if the backup wasn't found
        return msg.channel.send(":x: | No backup found for `"+backupID+"`!");
    });
}

module.exports = {
    saveBackupGuild: saveBackupGuild,
    loadBackupGuild: loadBackupGuild
};