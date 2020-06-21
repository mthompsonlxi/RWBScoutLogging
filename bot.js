import { scoutLog } from './commands/scoutLogCommand.js';
import { setSpawnTimes } from './commands/setSpawnTimesCommand.js';
import { addGuild } from './commands/addGuildCommand.js';
import { scoutStart } from './commands/scoutStartCommand.js';
import { scoutEnd } from './commands/scoutEndCommand.js';
import { summoner } from './commands/summonerCommand.js';
import { bossKill } from './commands/bossKillCommand.js';
import { commandsowo } from './commands/helpCommand.js';
import { test } from './commands/testingshit.js';
import path from 'path';
import * as auth from './config.js';
import * as Discord from 'discord.js';

var client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.default.token);

client.on('message', discordMessage => {
    try {
        var cmd = "";
        var __dirname = path.resolve();
        if (discordMessage.content.substring(0, 1) == '!') {
            if(discordMessage.content.indexOf(' ') >= 0) {
                cmd = discordMessage.content.substr(0, discordMessage.content.indexOf(' '));
            }
            else {
                cmd = discordMessage.content;
            }
            var args = discordMessage.content.substr(discordMessage.content.indexOf(' ')+1).replace(/\]/g, '').split('[');
            var success = [];
            switch(cmd) {
                case '!addGuild':
                    success = addGuild(args, __dirname);
                break;
                case '!setSpawnTimes':
                    success = setSpawnTimes(args, __dirname);
                break;
                case '!scoutLog':
                    success = scoutLog(discordMessage, args, __dirname);
                break;
                case '!startScout':
                case '!scoutStart':
                    success = scoutStart(discordMessage, args, __dirname);
                break;
                case '!endScout':
                case '!scoutEnd':
                    success = scoutEnd(discordMessage, args, __dirname);
                break;
                case '!summoner':
                    success = summoner(discordMessage, args, __dirname);
                break;
                case '!bossKill':
                    success = bossKill(discordMessage, args, __dirname);
                break;
                case '!commandsowo':
                    success = commandsowo(discordMessage, args, __dirname);
                break;
                case '!test':
                    success = test(discordMessage, args, __dirname);
                break;
                default:
                    success.push({
                        result: false,
                        errorMessage: 'Sorry that format is incorrect'
                    })
                break;
            }

            if(success.length != 0) {
                for(var i = 1; i <= success.length; i++){
                    discordMessage.channel.send(success[i-1].errorMessage);
                }
            }
        }
    }
    catch(err) {
        discordMessage.channel.send("A serious error occurred. Message Bilbsy as he will need to fix this.");
        console.log(err);
    }
});