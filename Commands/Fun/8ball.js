const { MessageEmbed } = require('discord.js');

module.exports = {
	aliases: ['ball'],
	description: 'An 8ball command that will answer your questions.',
	category: 'Fun',
	minArgs: 1,
	maxArgs: -1,
	expectedArgs: '<question>?',
	requiredPermissions: ["SEND_MESSAGES"],
	callback: ({ message, args }) => {

      let responses = [
		'Maybe.',
		'Certainly not.',
		'I hope so.',
		'Not in your wildest dreams.',
		'There is a good chance.',
		'Quite likely.',
		'I think so.',
		'I hope not.',
		'I hope so.',
		'Never!',
		'Fuhgeddaboudit.',
		'Pfft.',
		'Sorry, bucko.',
		'The future is bleak.',
		'The future is uncertain.',
		'I would rather not say.',
		'Who cares?',
		'Possibly.',
		'Never, ever, ever.',
		'There is a small chance.',
		'Yes!'
	  ];
	  
	  const result = Math.floor((Math.random() * responses.length));
		const question = args.join(' ');
		const questionShortener = question.length > 1900 ? question.substring(0, 1800) + '...' : question;

		const Usage = new MessageEmbed()
			.setTitle('No question asked!')
			.setDescription('Please ask a question for the 8ball to answer.')
			.setFooter('SYNTAX ERROR')
			.setColor('RED');

		if (!args[1]) return message.channel.send(Usage);

	  const member = message.author

		const ballembed = new MessageEmbed()
			.setTitle(':8ball: 8ball Response')
			.setDescription(`Question\n**${questionShortener}**\n\nResponse\n**${responses[result]}**`)
			.setFooter(`Asked by ${message.author.tag}`, message.author.displayAvatarURL())
			.setTimestamp()
			.setColor(member.displayHexColor || 'ORANGE');


		message.channel.send(ballembed);
    	}
}