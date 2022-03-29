module.exports = {
    name: 'skill',
    description: 'Displays how much skill you have (in the skill you specified)',
    syntax: '<Skill>',
    args: true,
    run:async(message, Discord, client, args) => {
        let { randomInt } = require('crypto')
        message.channel.send(`Your skill in **${args.join(' ')}** is **${randomInt(100)}%**.`)
    }
}