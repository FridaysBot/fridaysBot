const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ["avatar", "av"],
    description: "Displays a user's avatar",
    category: 'Fun',
    minArgs: 0,
    maxArgs: 1,
    requiredPermissions: ["SEND_MESSAGES"],
    callback: ({ message }) => {
        let member = message.mentions.users.first() || message.author
        let avatar = member.displayAvatarURL({size: 1024})

        const embed = new MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor('WHITE')
    message.channel.send(embed)
	}
}