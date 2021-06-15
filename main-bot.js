const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const dotenv = require('dotenv');
dotenv.config();

const config = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) 
    {
        return;
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) 
    {
        return;
    }

    try 
    {
        const command = client.commands.get(commandName);

        if (command.permissions) 
        {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) 
            {
                return message.reply('You can not do this!');
            }
        }
        
        command.execute(message, args);
    } 
    catch (error) 
    {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(process.env.TOKEN);