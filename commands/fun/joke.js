module.exports = {
    name: 'joke',
    description: 'Shows a random Joke',
    syntax: '',
    run:async(message, Discord, client, args) => {
        const fetch = require('node-fetch');
        let req = await fetch(`https://api.popcat.xyz/joke`).catch(console.log);
        if(!req) return message.channel.send('An error appeared.');
        let res = await req.json();
        message.channel.send(res.joke).catch(console.log);
    }
}