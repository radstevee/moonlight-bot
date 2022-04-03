module.exports = {
    name: 'skill',
    description: 'Displays how much skill you have (in the skill you specified)',
    syntax: '<Skill>',
    args: true,
    run:async(message) => {
        let { randomInt } = require('crypto')
        message.channel.send(`Your skill in **${message.args.join(' ')}** is **${randomInt(100)}%**.`)
    }
}