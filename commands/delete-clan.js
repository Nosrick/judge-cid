const clansManager = require("./../clans-manager.js");

module.exports =
    {
        name: 'delete-clan',
        description: 'Deletes a clan role from the server.',
        args: true,
        guildOnly: true,
        permissions: 'MANAGE_ROLES',
        execute(message, args)
        {
            if(!args.length)
            {
                message.channel.send('No arguments provided!');
            }

            const roleName = args.join(' ');
            
            const role = message.guild.roles.cache.find(obj => obj.name === roleName);

            if(!role || !clansManager.isClan(roleName))
            {
                message.channel.send('Role ' + roleName + ' does not exist!');
                return;
            }

            if(clansManager.removeClan(roleName))
            {
                role.delete()
                    .then(r => message.channel.send('Removed clan role ' + roleName + ' from clans list.'))
                    .catch(console.error);
            }
        }
    };