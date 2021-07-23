const { MessageEmbed } = require('discord.js');

module.exports = {
  commands: ['kick'],
  description: 'Kicks a user from the server',
  category: 'Moderation',
  requiredPermissions: ['KICK_MEMBERS'],
  callback: async ({ message, args }) => {
        const kickedmember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");
    
        if (!kickedmember) {
          let kickinfoembed = new MessageEmbed()
            .setTitle(`**ERROR** Undefined Member`)
            .setColor('RED')
            .setDescription(`You have failed to define a member, please rerun the command and do \`!kick @user <reason>\``)
            .setTimestamp()
          message.channel.send(kickinfoembed)

          if(kickedmember.id === '697864119302225952') {
              return message.channel.send('You cannot kick the owner of this bot. \n **This is strictly for development purposes**')
            }
    
          return;
        }
        if (message.author === kickedmember) {
          let kickyourselfembed = new MessageEmbed()
            .setTitle(`**ERROR** Punishing Yourself.`)
            .setDescription(`You can't punish yourself, please rerun the command and do \`!kick @user <reason>\``)
            .setColor('RED')
            .setTimestamp()
          
          message.channel.send(kickyourselfembed)
          
          return;
        }
    
        if (!reason) {
          let noreasonembed = new MessageEmbed()
            .setTitle(`**ERROR** Undefined Reason`)
            .setColor('RED')
            .setDescription(`You have failed to define a reason, please rerun the command. \n Usage: \`!kick @user <reason>\``)
            .setTimestamp()
        message.channel.send(noreasonembed)

        return;
        }
    
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
          let nopermsembed2 = new MessageEmbed()
            .setTitle(`**ERROR** No Permissions`)
            .setDescription(`You do not have the required permissions to execute this command. If you believe this is an error, please contact an Admin.`)
            .setColor('RED')
            .setTimestamp()
        message.channel.send(nopermsembed2)
        
        return;
        }
    
        let messagereasonembed = new MessageEmbed()
          .setTitle(`**KICKED** from ${message.guild}`)
          .setDescription(`You have been kicked from ${message.guild}.`)
          .addField(`MODERATOR`, `${message.author}`)
          .addField(`REASON`, `${reason}`)
          .setColor('a8f3ff')
    
        try {
          await kickedmember.send(messagereasonembed);
        } catch (err) {
          console.log(`I was unable to message the member.`)
        }
    
        try {
          await message.guild.member(kickedmember).kick(reason);
        } catch (err) {
          console.log(err);
        }
    
        let succesfulembed = new MessageEmbed()
          .setDescription(`You have successfully kicked ${kickedmember} from the server.`)
          .setColor(`GREEN`)
        message.channel.send(succesfulembed)
      }

    };