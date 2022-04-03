module.exports = {
    name: 'tosdr',
    description: 'Shows the rating of an Application from Terms Of Service; Didn\'t read.',
    syntax: '<Name or Website (Website is more accurate)>',
    args: true,
    run: async(message) => {
        let fetch = require('node-fetch');
        let req = await fetch(`https://api.tosdr.org/search/v4/?query=${message.args.join(' ')}`);
        let res = await req.json();
        function linkStuff(res) {
            let links = (res.parameters.services[0].urls);
            let i = -1;
            let urls = [];
            (links.join(', ')).split(', ').forEach(element => {
                i++;
                urls[i] = `[${links[i]}](https://${element})`;
            });
            return urls;
        };
        if(res.parameters.services[0].urls.length >= 40) {
            message.channel.send({embeds: [{
                title: `TOS;DR-Rating of ${res.parameters.services[0].name}`,
                url: `http://${res.parameters.services[0].urls[0]}`,
                description: `Is comprehensively reviewed: ${res.parameters.services[0].is_comprehensively_reviewed}\nGrade: ${res.parameters.services[0].rating.letter}\n[Wikipedia Article](${res.parameters.services[0].wikipedia})\n${res.parameters.services[0].name} has more URLS than the message limit, sorry`,
                thumbnail: {
                    url: res.parameters.services[0].links.crisp.badge.png
                },
                color: '#347ff7'
            }]});
        } else {
            message.channel.send({embeds: [{
                title: `TOS;DR-Rating of ${res.parameters.services[0].name}`,
                url: `http://${res.parameters.services[0].urls[0]}`,
                description: `Is comprehensively reviewed: ${res.parameters.services[0].is_comprehensively_reviewed}\nGrade: ${res.parameters.services[0].rating.letter}\n[Wikipedia Article](${res.parameters.services[0].wikipedia})\nLink(s): ${(linkStuff(res)).join(', ')} `,
                thumbnail: {
                   url: res.parameters.services[0].links.crisp.badge.png
                },
                color: '#347ff7'
            }]});
        }
    }
}