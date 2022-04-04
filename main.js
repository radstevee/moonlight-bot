let Discord = require('discord.js');
let fs = require('fs-extra'); 
let client = new Discord.Client({ intents: new Discord.Intents(32767) }); 
let chalk = require('chalk'); 
let db = require('./db');
db.init();
client.config = require('./config.json'); 
client.commands = {}; 
client.commandCategorys = fs.readdirSync('./commands/'); 

client.login(client.config.token); 

client.commandCategorys.forEach(element => {
    if(!fs.statSync(`./commands/${element}`).isDirectory()) return;
    const commandFiles = fs.readdirSync(`./commands/${element}`).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./commands/${element}/${file}`);
        client.commands[command.name] = command;
    };
});

client.on('ready', async () => {
    console.log(chalk.green(`${chalk.yellow(`[Process-Handler]`)} Moonlight is online.`));
});

client.on('messageCreate', async message => {
    let prefix = db.get(message.guild.id, 'prefixes') || client.config.prefix;
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(/ +/);
    message.args = args;
    message.client = client;
    message.Discord = Discord;
    const command = message.args.shift().toLowerCase();
    if(!(command in client.commands)) return; 
    if(client.commands[command].args && client.commands[command].args == true && !args.join(' ')) {
	let cmd = client.commands[command];
        await message.channel.send('You need to put arguments for this command to work.');
        return await message.channel.send({embeds: [{title: `Moonlight - Help - ${cmd.name}-Command`, fields: [{name: 'Description', value: cmd.description},{name: 'Syntax', value: cmd.syntax}], color: '#0099ff', footer: '<> = Necessary, [] = Optional'}]});
    };
    await client.commands[command].run(message, client, Discord, args);
    console.log(chalk.cyan(`${chalk.yellow(`[Command-Handler]`)} ${client.commands[command].name} | #${message.channel.name} | ${message.guild.name} | ${args.join(' ') || 'no args'}`));
});

client.on('guildMemberAdd', async member => {
    let channel = db.get(member.guild.id, 'welcome-channels');
    if(!channel) return;
    let channelObj = member.guild.channels.cache.get(channel);
    if(!channelObj) return;
    let message = db.get(member.guild.id, 'welcome-messages');
    if(!message) return;
    channelObj.send(message.replace(/{user}/g, member.user.tag).replace(/{server}/g, member.guild.name));
});

client.on('guildMemberRemove', async member => {
    let channel = db.get(member.guild.id, 'leave-channels');
    if(!channel) return;
    let channelObj = member.guild.channels.cache.get(channel);
    if(!channelObj) return;
    let message = db.get(member.guild.id, 'leave-messages');
    if(!message) return;
    channelObj.send(message.replace(/{user}/g, member.user.tag).replace(/{server}/g, member.guild.name));
});

process.on('uncaughtException', err => {
    let date = new Date(); 
    console.log(err); 
    if(!fs.existsSync('./errlogs')) fs.mkdirSync('./errlogs'); 
    fs.writeJSONSync(`./errlogs/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-log.json`, {name: err.name, msg: err.message, stack: err.stack});
});
