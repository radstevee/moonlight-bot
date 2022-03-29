module.exports = {
    name: 'dog',
    description: 'Shows a picture or GIF of a dog',
    syntax: '',
    run:async(message, Discord, client) => {
        const fetch = require('node-fetch')
        let req = await fetch('https://dog.ceo/api/breeds/image/random').catch(console.log);
        if(!req) return message.channel.send('An error appeared.');
        let res = await req.json();
        let embed = {
            image: {
                url: res.message
            },
            color: '#347ff7'
        };
        message.channel.send({embeds: [embed]}).catch(console.log);
    }
}