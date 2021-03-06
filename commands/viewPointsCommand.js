import * as fs from 'fs';
import * as Discord from 'discord.js';

export function viewPoints(disccordMessage, args, __dirname) {
    var guilds = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8') == "" ? []
        : JSON.parse(fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8'));
    var guildOutput = [];
    var success = [];

    guilds.forEach(guild => {
        if((guild.kazzak.points == "" || guild.kazzak.points == 0) && 
            (guild.azuregos.points == "" || guild.azuregos.points == 0) &&
            (guild.dragons.points == "" || guild.dragons.points == 0)) {
            return;
        }

        guildOutput.push({
            name: ':crossed_swords: ' + guild.guildName + ':crossed_swords:',
            value: '```   Kazzak: ' + (guild.kazzak.points == "" ? 0 : guild.kazzak.points) + '\n' +
                '   Azuregos: ' + (guild.azuregos.points == "" ? 0 : guild.azuregos.points) + '\n' +
            '   Dragons: ' + (guild.dragons.points == "" ? 0 : guild.dragons.points) + '```'               
        });
    });

    if(guildOutput.length == 0){
        guildOutput.push({ name: 'No points have been acrewed for any bosses this session.' })
    }

    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .addFields(guildOutput);
            
    success.push({
        result: true,
        errorMessage: exampleEmbed
    });

    return success;
}