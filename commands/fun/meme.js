module.exports = {
    name: 'meme',
    description: 'Shows a random Meme',
    syntax: '',
    run:async(message) => {
        const fetch = require('node-fetch')
        let req = await fetch('https://api.popcat.xyz/meme').catch(console.log);
        if(!req) return message.channel.send('An error appeared.');
        let res = await req.json();
        let embed = {
            image: {
                url: res.image
            },
            color: '#347ff7'
        };
        message.channel.send({embeds: [embed]}).catch(console.log);
    }
}