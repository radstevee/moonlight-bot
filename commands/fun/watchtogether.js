module.exports = {
    name: 'watchtogether',
    description: '',
    syntax: '<game/video platform>',
    args: true,
    run:async(message, client, Discord, args) => {
        let { DiscordTogether } = require('discord-together');
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel) return
        client.discordTogether.createTogetherCode(message.member.voice.channel.id, String(args.join(' '))).then(async invite => {
            return message.channel.send(`<${invite.code}>. Click on the link`);
        }).catch(console.log);
    }
}