module.exports = {
    name: 'leavemsg-channel',
    description: 'Sets the channel for the leave message.',
    syntax: 'leave-channel [channel]',
    args: true,
    run: async(message) => {
        if(message.member.permissions.has('MANAGE_GUILD')) {
            let db = require('../../db');
            if(!message.args[0] || !message.content.length === 18) return message.channel.send('You need to put a channel id.');
            if(!message.guild.channels.cache.get(message.args[0])) return message.channel.send('The channel id is invalid.');
            db.set(message.guild.id, message.args[0], 'leave-channels');
            db.save();
            message.channel.send('The leave message channel has been set.');
        } else { 
            return message.channel.send('You do not have the permission to use this command.'); 
        };
    }
}