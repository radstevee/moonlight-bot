module.exports = {
    name: 'invite',
    description: 'Sends the invite link for the bot',
    syntax: '',
    run: async(message) => {
        message.channel.send(`Invite Link for the Bot: https://shorturl.at/tEKT9`)
    }
}