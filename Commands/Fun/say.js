const { blacklistedWords } = require('../../Data/blacklistedWords.json')

module.exports = {
    name: 'say',
    description: 'Make the bot say anything you wish. (Includes blacklisted words)',
    category: 'Fun',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<message>',
    callback: ({ message, args }) => {

        let confirm = false

        let i;
        for (i = 0;i < blacklistedWords.length; i++) {
            if (message.content.toLowerCase().includes(blacklistedWords[i].toLowerCase())) {
                confirm = true;
            }

            if (confirm) {
                message.delete()
                return message.channel.send('I cannot send your message as it contains words that are blacklisted!')
            }
        }

        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if (textChannel) {
            msg = args.slice(1).join(" ")
            textChannel.send(msg)
        } else {
            msg = args.join(" ")
            message.channel.send(msg)
        }
    }
}