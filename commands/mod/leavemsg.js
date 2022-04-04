module.exports = {
    name: 'leavemsg',
    description: 'Sets the leave message. (use {user} for the user tag and {server} for the server name)',
    syntax: 'leavemsg [message]',
    args: true,
    run: async(message) => {
        if(message.member.permissions.has('MANAGE_GUILD')) {
            let db = require('../../db');
            if(!message.args.join(' ')) return message.channel.send('You need to put a message.');
            db.set(message.guild.id, message.args.join(' '), 'leave-messages');
            db.save();
            message.channel.send('The leave message has been set.');
        } else { 
            return message.channel.send('You do not have the permission to use this command.'); 
        };
    }
}