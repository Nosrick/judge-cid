const clansManager = require("./../clans-manager.js");

module.exports =
    {
        name: 'clan-list',
        description: 'Lists the current clans available.',
        execute(message, args) {
            const clanList = clansManager.clanList();
            if(!clanList.length)
            {
                return message.channel.send('No clans in this guild hall!');
            }
            
            message.channel.send('Clan list: \n' + clanList);
        }
    };