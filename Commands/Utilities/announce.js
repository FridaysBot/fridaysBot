const { MessageEmbed } = require('discord.js');

module.exports = {
    aliases: ['announcement'],
    description: 'Make an announcement to your server!',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<channel>',
    category: 'Utilities',
    callback: async ({ message }) => {
        if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('MANAGE_CHANNELS') || message.member.hasPermission("MANAGE_GUILD")) {
            
            let channel = message.mentions.channels.first()

            if (channel) { 
                message.channel.send('Alright! What would you like the announcement to say?') 
                message.channel.awaitMessages(m => m.author.id == message.author.id, {
                    max: 1,
                    time: 180000,
                    errors: ['time'],
                })
                .catch(function () {
                    message.channel.send(`⚠ ${message.author} - You didnt write down the message on time`);
                })  
            .then(async (collected) => {
                message.channel.send('Alright! Would you like to make this an embed?')
               
                const collectingWordOrPhrase = await message.channel.awaitMessages(userMessage => userMessage.author.id === message.author.id, { time: 120000, max: 1 })
                const wordOrPhrase = collectingWordOrPhrase.first().content.toLowerCase();

                if (wordOrPhrase === 'yes') {

                const announcementEmbed = new MessageEmbed()
                    .setTitle('New announcement!')
                    .setDescription(collected.first())
                    .setColor('BLUE')
                    .setFooter(`Announcement sent by ${message.author.username}`)
                    .setTimestamp()
                channel.send(announcementEmbed)
                message.channel.send('Alright! I will make it an embed and I have sent it!')
            } 
            
            if (wordOrPhrase === 'no') {
                channel.send(`**NEW ANNOUNCEMENT** \n\n ${collected.first()}`)
            message.channel.send('Alright! I will not make the announcement an embed and I have sent it!') 
            }
            
            })
        }
            } else {
                message.channel.send('Yo have no permission to run this command prompt.')
                }
        }
}