module.exports = {
    name: 'kick',
    description: 'Kicks someone',
    syntax: '<Mention of user>',
    args: true,
    run: async(message) => {
        if(message.member.permissions.has('KICK_MEMBERS')) {
            try {
                let member = message.mentions.members.first();
                if(!member) return message.channel.send(`Please mention a valid member of this server, ${message.author.username}.`);
                if(!member.kickable) return message.channel.send('I cannot kick this member!');
                member.kick();
                message.channel.send({embeds: [{title: 'Excerz', description: `${member} was successfully kicked.`, color: '#24fc03'}]})
            } catch(err) {
                message.channel.send('An error appeared!'); console.log(`[Error] Kick-Command | ${err}`)
            }
        }
    }
}