module.exports = {
    name: 'random-number',
    description: 'Provides a random number from the given range.',
    syntax: '[Minimum Range] <Maximum Range>',
    args: true,
    run: async(message, Discord, client, args) => {
        if(!args[1]) {
            let randomNumber = require('crypto').randomInt(parseInt(args[0])).toString();
            message.channel.send(`The dice says: ${randomNumber}`);
        } else if(args[1]) {
            let randomNumber = require('crypto').randomInt(parseInt(args[0]), parseInt(args[1])).toString();
            message.channel.send(`The dice says: ${randomNumber}`);
        }
    }
}