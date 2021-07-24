const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client({
    // Use recommended partials for the built-in help menu
    partials: ['MESSAGE', 'REACTION']
})

client.on('ready', () => {
    // The client object is required as the first argument.
    // The second argument is the options object.
    // All properties of this object are optional.

    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: 'Commands',
        
        // The name of the local folder for your feature files
        featuresDir: 'Features',
        
        // The name of the local file for your message text and translations
        // Omitting this will use the built-in message path
        messagesPath: 'messages.json',
        
        // If WOKCommands warning should be shown or not, default true
        showWarns: true,
        
        // How many seconds to keep error messages before deleting them
        // -1 means do not delete, defaults to -1
        del: -1,
        
        // What language your bot should use
        // Must be supported in your messages.json file
        defaultLangauge: "english",
        
        // If your commands should not be ran by a bot, default false
        ignoreBots: false,
        
        // Various options for your MongoDB database connection
        dbOptions: {
            // These 4 are the default options
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        
        // What built-in commands should be disabled.
        // Note that you can overwrite a command as well by using
        // the same name as the command file name.
        disabledDefaultCommands: [
            // 'help',
            // 'command',
            // 'language',
            // 'prefix',
            // 'requiredrole'
        ]
    })

    .setCategorySettings([
        {
            name: 'Fun',
            emoji: '🎮'
        },
        {
            name: 'Moderation',
            emoji: '🛡️'
        },
        {
            name: 'Information',
            emoji: '📋'
        },
        {
            name: 'Utilities',
            emoji: '🔨'
        },
        {
            name: 'Development',
            emoji: '💡'
        }
    ])
        
        .setDefaultPrefix('?')
        .setColor('#D01C00')
        
        // When connecting to a Mongo database.
        // For more infomration view the "DATABASES" section
        // of this documentation.
        .setMongoPath(process.env.MONGO_URI)
})

client.on('guildMemberAdd', (member, message) => {
    
    const welcomeChannelId = '730909385622290513'

    const welcomeEmbed = new DiscordJS.MessageEmbed()
    .setTitle('New Member Joined!')
    .setColor('GREEN')
    .setThumbnail('https://cdn.discordapp.com/attachments/782634444028772354/868546582629482586/1200px-Emoji_u1f44b.png')
    .setDescription(`Welcome, <@${member.id}> to ${message.guild}! Please enjoy your stay and remember to read our rules.`)
    .setTimestamp()

    const channel = member.guild.channels.cache.get(welcomeChannelId)
    channel.send(welcomeEmbed)

})

client.login(process.env.TOKEN)