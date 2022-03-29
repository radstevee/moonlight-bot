module.exports = {
    name: '8ball',
    description: 'The magic 8-Ball',
    syntax: '<Question>',
    args: true,
    run:async(message, Discord, client) => {
        let answers = ['It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes – definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don’t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.']
        let { randomInt } = require('crypto')
        message.channel.send(answers[randomInt(answers.length - 1)])
    }
}