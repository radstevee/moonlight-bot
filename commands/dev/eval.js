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
            message.channel.send(output || 'done');
        } catch(err) {
            message.channel.send(`An error appeared: ${err}`);
            console.log(`[Eval-Command] Error: ${err}`);
        }
    }
}