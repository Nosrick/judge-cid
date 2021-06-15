const clansManager = require("./../clans-manager.js");

module.exports =
    {
        name: 'join-clan',
        description: 'Adds the selected clan role to the user.',
        execute(message, args) {
            if (!args.length) {
                message.channel.send('No arguments provided!');
            }

            const roleName = args.join(' ');

            let role =
                message.guild.roles.cache.find((r) => r.name === roleName) ||
                message.guild.roles.cache.find((r) => r.id === roleName);

            if (!role || clansManager.isClan(roleName) === false) {
                return message.channel.send('No role ' + roleName + ' exists!');
            }
            
            if(message.member.roles.cache.filter(r => clansManager.clanList().some(r2 => r2 === r.name)).size !== 0)
            {
                return message.channel.send("User " + message.author.username + " is already part of a clan.");
            }
            
            message.member.roles.add(role.id)
                .then(r => message.channel.send('Added ' + roleName + ' to ' + message.author.username))
                .catch(console.error);
        }
    };