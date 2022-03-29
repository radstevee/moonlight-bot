module.exports = {
    name: 'cat',
    description: 'Shows a picture or GIF of a cat',
    syntax: '',
     run:async(message, Discord, client) => {
        const fetch = require('node-fetch')
        let req = await fetch('https://api.thecatapi.com/v1/images/search').catch(console.log);
        if(!req) return message.channel.send('An error appeared.');
        let res = await req.json();
        console.log(res[0].url)
        let embed = {
            image: {
                url: res[0].url
            },
            color: '#347ff7'
        };
        message.channel.send({embeds: [embed]}).catch(console.log);
    }
}