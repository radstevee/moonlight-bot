module.exports = {
    name: 'test',
    description: 'Umm... tests?',
    syntax: '',
    run: async(message, Discord, client) =>{
        await message.channel.send(`test failed successfully`)
    }
}