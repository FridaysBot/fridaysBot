const giveMeAJoke = require('discord-jokes')

module.exports = {
    aliases: ['dadjoke', 'dj'],
    description: 'Tells you a random joke!',
    category: 'Fun',
    callback: ({ message }) => {

        giveMeAJoke.getRandomDadJoke(function(joke) {
            message.channel.send(joke)
        })
    }
}