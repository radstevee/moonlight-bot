module.exports = {
    name: 'welcomemsg',
    description: 'Sets the welcome message. (use {user} for the user tag and {server} for the server name)',
    syntax: 'welcomemsg [message]',
    args: true,
    run: async(message) => {
        if(message.member.permissions.has('MANAGE_GUILD')) {
            let db = require('../../db');
            if(!message.args.join(' ')) return message.channel.send('You need to put a message.');
            db.set(message.guild.id, message.args.join(' '), 'welcome-messages');
            db.save();
            message.channel.send('The welcome message has been set.');
        } else { 
            return message.channel.send('You do not have the permission to use this command.'); 
        };
    }
}