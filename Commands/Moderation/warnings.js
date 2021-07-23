const warns = require('../../Schemas/warn-schema')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['listwarns', 'warnings', 'lw'],
  description: 'Lists the warns for a given user',
  category: 'Moderation',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<user>',
  requiredPermissions: ['SEND_MESSAGES'],
  callback: async ({ message }) => {
    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`No user specified!`);
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        let Embed = new MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
          .setColor('BLUE')
          .setDescription(
            data.map((d) => {
              return d.Warns.map(
                (w, i) =>
                  `${i} - Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag} Reason: ${w.Reason}`
              ).join("\n");
            })
          );
        message.channel.send(Embed);
      }
    );
  },
};
