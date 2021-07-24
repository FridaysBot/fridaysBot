const Discord = require('discord.js')

module.exports = (client, instance) => {

    client.on('guildMemberAdd', (member) => {

        const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle('New Member Joined!')
        .setColor('GREEN')
        .setThumbnail('https://cdn.discordapp.com/attachments/782634444028772354/868546582629482586/1200px-Emoji_u1f44b.png')
        .setDescription(`Welcome, <@${member.id}> to ${member.guild}! Please enjoy your stay and remember to read our rules.`)
        .setTimestamp()

        const channel = guild.channels.cache.find(
            (channel) => channel.name === "welcome"
          )

          if (!channel) {
            return
          }

        channel.send(welcomeEmbed)
    })
}

module.exports.config = {
    displayName: 'JoinLogs', // Can be changed any time
    dbName: 'FridaysMongoDB', // Should be unique and NEVER be changed once set
    loadDBFirst: false, // Wait for the database connection to be present
  }