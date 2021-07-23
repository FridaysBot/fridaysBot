const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    commands: ['hush', 'quiet'],
    description: 'mutes a user for a specified amount of time',
    category: 'Moderation',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<user> <time>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    callback: async ({ message, args }) => {

        const mute1 = new MessageEmbed() .setTitle('**Please specify someone to mute.**') .setColor('RED') .setFooter('SYNTAX ERROR');
        const mute2 = new MessageEmbed() .setTitle('**This member is currently muted.**') .setColor('RED') .setFooter('MUTE MEMBER ERROR');
        const mute3 = new MessageEmbed() .setTitle('**Please specify a time for the mute.**') .setColor('RED') .setFooter('SYNTAX ERROR');

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
                if(!member) return message.channel.send(mute1)
      
                let role = message.guild.roles.cache.find(role => role.name === "Muted");
                
                if(!role) {
                    try {
                        // Create a role called "Muted"
                        role = await message.guild.roles.create(({
                            data: {name: "Muted", color: "#6d6d6d", permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']} 
                        }));
                    } catch(e) {
                        // If err print
                        console.log(e.stack);
                    }
                }

                if(member.roles.cache.find(r => r.name === "Muted")) return message.channel.send(mute2); 
                
                let time = args[1];
                if (!time) {
                    return message.channel.send(mute3);
                } 
 
                member.roles.add(role.id);
    
                const muteSuccess = new MessageEmbed()
                .setDescription(`${member} has now been muted for ${ms(ms(time))}`)
                .setColor(`GREEN`)
            message.channel.send(muteSuccess)
              
                setTimeout( function () {
    
                    member.roles.remove(role.id);
                }, ms(time));
    }

};