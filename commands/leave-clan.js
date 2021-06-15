const clansManager = require("./../clans-manager.js");

module.exports =
    {
        name: 'leave-clan',
        description: 'Removes the selected clan role from the user.',
        execute(message, args) {
            if (!args.length) {
                message.channel.send('No arguments provided!');
            }

            const roleName = args.join(' ');

            let role =
                message.guild.roles.cache.find((r) => r.name === roleName) ||
                message.guild.roles.cache.find((r) => r.id === roleName);

            if (!role || clansManager.isClan(roleName) === false) {
                message.channel.send('No role ' + roleName + ' exists!');
                return;
            }

            message.member.roles.remove(role)
                .then(r => message.channel.send('Removed ' + roleName + ' from ' + message.author.username))
                .catch(console.error);
        }
    };