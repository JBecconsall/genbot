const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
const config  = require('../data/config.json');
const {createWelcome} = require('../database/queries/welcomeQuery');
const fetchWelcome = require('../database/schemas/welcomeSchema')
module.exports = {
    category: 'Utils',
    name: 'addrole',
    description: 'Adds a role to the user',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'channel',
            description: 'The channel to set the welcome message for',
            required: true,
            type: ApplicationCommandOptionType.Channel
        },
        {
            name: 'message',
            description: 'The message to send (use {user} to tag the user)',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    callback: async ({interaction, client}) => {

        const channel = interaction.options.getChannel('channel')
        const message = interaction.options.getString('message')

        const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this.')
            .setColor('Red')
            .setTimestamp()

        if (!interaction.member.roles.cache.has(config.PERM_SETWELCOME)) { 

            interaction.reply({embeds: [errorEmbed], ephemeral: true})
        } else {

            const welcome = await fetchWelcome.findOne({channelID: channel.id})

            if (welcome) {
                await interaction.reply({content: 'A welcome channel is already set', ephemeral: true})
            } else {
                await createWelcome(message, channel.id)
                await interaction.reply({content: 'Welcome channel and message set', ephemeral: true})
            }

        }
        
    }
}
