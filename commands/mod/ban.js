module.exports =  {
    name: 'ban',
    description: 'Bans someone',
    syntax: '<Mention of User>',
    args: true,
    run: async(message) => {
        if (message.member.permissions.has('BAN_MEMBERS')) {
            try {
                let member = message.mentions.members.first();
                if(!member) return message.channel.send(`Please mention a valid member of this server, ${message.author.username}.`);
                if(!member.bannable) return message.channel.send('I cannot ban this member!');
                member.ban();
                message.channel.send({embeds: [{title: 'Moonlight', description: `${member} was successfully banned.`, color: '#24fc03'}]})
            } catch(err) {
                message.channel.send('An error appeared!'); console.log(`[Error] Ban-Command | ${err}`)
            }
        }
    }
}