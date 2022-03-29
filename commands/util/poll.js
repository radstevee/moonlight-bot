module.exports = {
    name: 'poll',
    description: 'Creates a poll',
    syntax: '<Name of the poll>',
    args: true,
    run: async(message, client, Discord, args) => {
        let msg = await message.channel.send({embeds: [{
            title: `Poll by ${message.author.username}`,
            description: args.join(' '),
            color: '#347ff7'
        }]});
        await msg.react('✅');
        await msg.react('❌');
    }
}