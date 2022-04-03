module.exports = {
    name: 'lyrics',
    description: 'Shows the lyrics of a song.',
    syntax: '<Song>',
    args: true,
    run:async(message) => {
        const fetch = require('node-fetch');
        let req = await fetch(`https://api.popcat.xyz/lyrics?song=${message.args.join(' ').replace(' ', '+').toLowerCase()}`).catch(console.log);
        if(!req) return message.channel.send('An error appeared.');
        let res = await req.json();
        let embed = {
            title: res.full_title,
            thumbnail: {
                url: res.image
            },
            description: `Lyrics of ${res.title}: \n${res.lyrics}`,
            color: '#347ff7'
        };
        message.channel.send({embeds: [embed]}).catch(console.log);
    }
}