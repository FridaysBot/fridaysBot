const discord = require('discord.js')

module.exports = {
  commands: ['ban', 'remove'],
  description: 'Bans a user from the server',
  category: 'Moderation',
  minArgs: 2,
  maxArgs: -1,
  expectedArgs: '<user> <reason>',
  requiredPermissions: ['BAN_MEMBERS'],
  callback: async ({ message, args }) => {

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let perms = message.member.permissions;
        let has_ban = perms.has("BAN_MEMBERS");

        if(target.id === message.author.id) {
            return message.reply("You cannot ban yourself!")
        }

        if (target.hasPermission('BAN_MEMBERS')) {
          return message.channel.send('This user has equal permissions to the bot and cannot be banned.')
        }

        if (!has_ban) {
          return message.channel.send('No permission to ban')
        }

        if(!target) return message.reply("Please mention someone to ban!")        

        if(target.id === '697864119302225952') {
          return message.channel.send('You cannot ban the owner of this bot. \n **This is strictly for development purposes**')
        }

        let reason = args.slice(1).join(' ')

        if(!reason) return message.reply("Please give a reason!")

        await target.ban({reason:reason})
      let embed = new discord.MessageEmbed()
          .setDescription(`You have successfully banned ${target} from the server.`)
          .setColor(`GREEN`)
        await message.channel.send(embed)

        let messagereasonembed = new discord.MessageEmbed()
          .setTitle(`**BANNED** from ${message.guild}`)
          .setDescription(`You have been banned from ${message.guild}.`)
          .addField(`MODERATOR`, `${message.author}`)
          .addField(`REASON`, `${reason}`)
          .setColor('a8f3ff')
    
        try {
          await target.send(messagereasonembed);
        } catch (err) {
          console.log(`I was unable to message the member.`)
        }
    }

}