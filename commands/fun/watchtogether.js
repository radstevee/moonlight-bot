module.exports = {
    name: 'watchtogether',
    description: '',
    syntax: '<game/video platform>',
    args: true,
    run:async(message) => {
        let { DiscordTogether } = require('discord-together');
        message.client.DiscordTogether = new DiscordTogether(message.client);
        if(!message.member.voice.channel) return
        message.client.message.modules.DiscordTogether.createTogetherCode(message.member.voice.channel.id, String(message.args.join(' '))).then(async invite => {
            return message.channel.send(`<${invite.code}>. Click on the link`);
        }).catch(console.log);
    }
}