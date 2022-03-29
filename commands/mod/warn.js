let db = require('../../db');
module.exports = {
    name: 'warn',
    description: 'Warns a user',
    syntax: '<Ping/ID> [Reason]',
    args: true,
    run: async(message, client, Discord, args) => {
        if(message.member.permissions.has('KICK_MEMBERS') || message.member.permissions.has('BAN_MEMBERS')) {
            if(args[0].startsWith('<@')) user = (message.mentions.members.first()).user;
            if(args[0].length === '18' && !message.content.includes('<@')) user = message.guild.members.cache.get(user.id).user;
            if (!message.guild.members.cache.has(user.id)) return message.channel.send('This user is not in this server!');
            if((db.get(`${user.id}_warns`, `${message.guild.id}_mod`)).length > 25) return message.channel.send('This user has too many warns! Discord only allows 25 embed fields!');
            let reason = `${(args.join(' ')).replace('<@!', '').replace('>', '').replace('<@', '').replace(user.id, '')}` || 'No reason set';
            if(reason.startsWith(' ')) reason = reason.replace(reason.charAt(0), '');
            if(db.has(`${user.id}_warns`, `${message.guild.id}_mod`) != true) {
                db.set(`${user.id}_warns`, [{mod: message.author.id, reason: reason}] ,`${message.guild.id}_mod`);
                db.save();
                await message.channel.send({embeds: [{title: `${user.tag} was successfully warned.`, description: `Warnings: ${(db.get(`${user.id}_warns`, `${message.guild.id}_mod`)).length}\nReason: ${reason}\nModerator: ${message.author.tag}`, color: '#347ff7'}]});
            } else {
                db.add(`${user.id}_warns`, {mod: message.author.id, reason: reason} ,`${message.guild.id}_mod`);
                db.save();
                await message.channel.send({embeds: [{title: `${user.tag} was successfully warned.`, description: `Warnings: ${(db.get(`${user.id}_warns`, `${message.guild.id}_mod`)).length}\nReason: ${reason}\nModerator: ${message.author.tag}`, color: '#347ff7'}]});
            }
        } else {
            return message.channel.send('You don\'t have the KICK_MEMBERS or BAN_MEMBERS permission!');
        }
    }
}