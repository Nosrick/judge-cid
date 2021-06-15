const fs = require("fs");

function loadClans()
{
    const fileLocation = process.env.CLAN_FILE;
    fs.access(fileLocation, function (error) {
        if (error) {
            fs.writeFile(
                fileLocation,
                '{ "clanRoles": [] }',
                function (writeError) {
                    console.log(writeError);
                });
            return console.log(error);
        }

        fs.readFile(fileLocation, function (error, data) {
            const clans = JSON.parse(data);
            for (let i = 0; i < clans.length; i++) {
                clanRoles.push(clans[i]);
            }
            return console.log(clanRoles);
        });
    });
}

function saveClans()
{
    const fileLocation = process.env.CLAN_FILE;
    fs.access(fileLocation, function (error) {
        if (error) {
            return console.error(error);
        }

        fs.writeFile(fileLocation, JSON.stringify(clanRoles), function (error) {
            if(error)
            {
                return console.error(error);
            }
        });
    });
}

let clanRoles = [];

class ClansManager
{    
    constructor() 
    {
        loadClans();
    }     
    
    addClan(name)
    {
        if(this.isClan(name))
        {
            return false;
        }
        clanRoles.push(name);
        saveClans();
        return true;
    }
    
    removeClan(name)
    {
        if(this.isClan(name))
        {
            clanRoles = clanRoles.filter(obj => obj !== name);
            saveClans();
            return true;
        }
        
        return false;
    }
    
    isClan(name)
    {
        return clanRoles.some(role => role === name);
    }
    
    clanList()
    {
        return [...clanRoles];
    }
}

module.exports = new ClansManager();