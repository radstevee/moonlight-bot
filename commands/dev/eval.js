module.exports = {
    name: 'eval',
    description: 'Runs javascript code (Owner only)',
    syntax: '<Command>',
    args: true,
    run: async(message) => {
        let ownerId = require('../../config.json').owner;
        if(message.author.id != ownerId) return message.channel.send('You\'re not the owner.');
        try {
            let output = eval(message.args.join(' '));
            if(output != null || output != undefined) message.channel.send(output);
        } catch(err) {
            message.channel.send('An error appeared.');
            console.log(`[Eval-Command] Error: ${err}`);
        }
    }
}