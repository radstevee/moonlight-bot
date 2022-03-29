module.exports = {
    name: 'fact',
    description: 'Shows a random fact.',
    syntax: '',
    run: async(message, Discord, client, args) => {
        let fetch  = require('node-fetch');
        let req = await fetch('https://api.popcat.xyz/fact');
        let res = await req.json();
        message.channel.send(res.fact)
    }
}