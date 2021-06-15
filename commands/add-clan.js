const Discord = require("discord.js");

const clansManager = require("./../clans-manager.js");

module.exports = 
{
    name: 'add-clan',
    description: 'Adds a clan role to the server. Takes a role name, and a colour code (as #RRGGBB)',
    args: true,
    guildOnly: true,
    permissions: 'MANAGE_ROLES',
    execute(message, args) 
    {        
        if(!args.length)
        {
            message.channel.send('No arguments provided!');
            return;
        }
        
        const roleName = args.slice(0, args.length - 1).join(' ');
        const roleColour = args[args.length - 1];
        
        if(roleColour.length !== 6)
        {
            message.channel.send('Incorrect format for role colour. Format: RRGGBB');
            return;
        }

        message.guild.roles.fetch(roleName)
            .then(role => console.log(role))
            .catch(console.error);
        
        if(clansManager.isClan(roleName))
        {
            message.channel.send('Role ' + roleName + ' already exists!');
            return;
        }
        
        message.guild.roles.create(
            {
                data : 
                { 
                    name: roleName, 
                    color: '#' + roleColour 
                }
            })
            .then(role => clansManager.addClan(roleName))
            .then(role => message.channel.send('Created clan role ' + roleName))
            .catch(console.error);
    }
};