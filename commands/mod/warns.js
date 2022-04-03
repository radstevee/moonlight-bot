let db = require("../../db");
module.exports = {
    name: 'warns',
    description: 'Shows the warns of a user',
    syntax: '<Ping/ID>',
    args: true,
    run: async(message) => {
        if(message.args[0].length === 18 && !message.content.includes('<@')) user = message.guild.members.cache.get(user.id).user;
        if(message.args[0].startsWith('<@')) user = (message.mentions.members.first()).user;
        if(!db.has(`${user.id}_warns`, `${message.guild.id}_mod`)) return message.channel.send('This user has no warns!');
        if((db.get(`${user.id}_warns`, `${message.guild.id}_mod`)).length > 25) return message.channel.send('This user has too many warns! message.Discord only allows 25 embed fields!');
        let warns = db.get(`${user.id}_warns`, `${message.guild.id}_mod`);
        let embed = {
            title: `${user.tag}'s warns`,
            description: `Warnings: ${warns.length}`,
            fields: [],
            color: '#347ff7',
		    footer: {text: 'Fun Fact: the code of this command was made by an AI!'}
        }
        for(let i = 0; i < warns.length; i++) {
            embed.fields.push({name: `#${i+1}`, value: `Moderator: ${message.guild.members.cache.get(warns[i].mod).user.tag}\nReason: ${warns[i].reason}`});
        }
        message.channel.send({embeds: [embed]});
    }
}
