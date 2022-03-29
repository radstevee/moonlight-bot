module.exports = {
    name: 'quote',
    description: 'Shows a random Quote',
    syntax: '',
    run:async(message, Discord, client) => {
        const fetch = require('node-fetch')
        let req = await fetch('https://api.popcat.xyz/quote').catch(console.log);
        if(!req) return message.channel.send('An error appeared.');
        let res = await req.json();
        message.channel.send(res.quote).catch(console.log);
    }
}