module.exports = {
    name: 'test',
    description: 'Umm... tests?',
    syntax: '',
    run: async(message) =>{
        await message.channel.send(`test failed successfully`)
    }
}