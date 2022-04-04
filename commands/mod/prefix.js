module.exports = {
    name: 'prefix',
    description: 'Sets the prefix for the bot',
    syntax: '<prefix>',
    args: true,
    run: async(message) => {
        if(message.member.permissions.has('MANAGE_GUILD')) {
            let db = require('../../db');
            let prefix = message.args.join(' ');
            if(prefix.startsWith(' ')) prefix = prefix.replace(prefix.charAt(0), '');
            if(prefix.length > 5) return message.channel.send('The prefix can\'t be longer than 5 characters!');
            db.set(message.guild.id, prefix, 'prefixes');
            db.save();
            return message.channel.send(`The prefix for the server has been set to ${prefix}`);
        } else {
            return message.channel.send('You don\'t have the MANAGE_GUILD permission!');
        }
    }
}