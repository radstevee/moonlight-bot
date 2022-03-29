module.exports = {
    name: 'help',
    description: 'Shows this message',
    syntax: '[Command]',
    run: async(message, client, Discord, args) => {
        let clientCommands = client.commands;
        let cmd = (args && args[0] && clientCommands[args[0]]) || null;

        if(!cmd) {
            let commands = [];
            for(let commandName in clientCommands) {
                let command = clientCommands[commandName];
                commands.push({name: `${commandName}`, value: `Description: ${command.description || 'No description'}\nSyntax/Additional Args: ${command.syntax || '-'}`});
            }
            return await message.channel.send({embeds: [{fields: commands, color: '#347ff7', title: 'Excerz - Help', footer: '<> = Necessary, [] = Optional'}]}).catch(console.error);
        }
        let embedfields = [{name: 'Description', value: cmd.description || 'No description'}, {name: 'Syntax/Additional Args', value: cmd.syntax || '-'}];
        return await message.channel.send({embeds: [{title: `Excerz - Help - ${cmd.name}-Command`, fields: embedfields, color: '#0099ff', footer: '<> = Necessary, [] = Optional'}]}).catch(console.error);
    }
}