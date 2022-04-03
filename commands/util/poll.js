module.exports = {
    name: 'poll',
    description: 'Creates a poll',
    syntax: '<Name of the poll>',
    args: true,
    run: async(message) => {
        let msg = await message.channel.send({embeds: [{
            title: `Poll by ${message.author.username}`,
            description: message.args.join(' '),
            color: '#347ff7'
        }]});
        await msg.react('✅');
        await msg.react('❌');
    }
}