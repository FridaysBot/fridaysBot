const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the API and Bot Latency response times',
    category: 'Information',
    callback: ({ message, client }) => {

        const Lime = '#3AFF00'

        const pingEmbed = new MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .setDescription(`Latency is \`${Date.now() - message.createdTimestamp}\`ms. API Latency is \`${Math.round(client.ws.ping)}\`ms`)
            .setColor(Lime)
    message.channel.send(pingEmbed);
    }
}
