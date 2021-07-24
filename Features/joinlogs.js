const Discord = require('discord.js')
const welcomeChannelId = '730909385622290513'

module.exports = (client, message) => {

    client.on('guildMemberAdd', (member) => {

        const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle('New Member Joined!')
        .setColor('GREEN')
        .setThumbnail('https://cdn.discordapp.com/attachments/782634444028772354/868546582629482586/1200px-Emoji_u1f44b.png')
        .setDescription(`Welcome, <@${member.id}> to ${message.guild}! Please enjoy your stay and remember to read our rules.`)
        .setTimestamp()

        const channel = member.guild.channels.cache.get(welcomeChannelId)
        channel.send(welcomeEmbed)
    })
}

module.exports.config = {
    displayName: 'JoinLogs', // Can be changed any time
    dbName: 'FridaysMongoDB', // Should be unique and NEVER be changed once set
    loadDBFirst: false, // Wait for the database connection to be present
  }