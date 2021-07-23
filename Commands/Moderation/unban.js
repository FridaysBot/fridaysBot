const { MessageEmbed } = require('discord.js');

module.exports = {
  commands: ['unban', 'ub'],
  description: 'Unbans a user from the server',
  category: 'Moderation',
  minArgs: 1,
  maxARgs: 1,
  expectedArgs: '<userID>',
  requiredPermissions: ['BAN_MEMBERS'],
  callback: ({ message, args }) => {

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
          }
          
          if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
          }

          const errorEmbed = new MessageEmbed()
            .setDescription('Incorrect user ID. (User was not found)')
            .setColor('RED')
          
          let userID = args[0]
            message.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return message.channel.send('No bans')
            let bUser = bans.find(b => b.user.id == userID)
            if(!bUser) {
                 return message.channel.send(errorEmbed)
            };
            message.guild.members.unban(bUser.user)
            
            const embed = new MessageEmbed()
            .setDescription(`User was unbanned`)
            .setColor('GREEN')
            .setFooter(`User ID: ${userID}`)
          message.channel.send(embed)
      });
    }

};