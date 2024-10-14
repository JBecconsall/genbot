const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
const config  = require('../../data/config.json');
const Points = require('../../database/schemas/pointsSchema')
module.exports = {
    category: 'Utils',
    name: 'points',
    description: 'Checks points',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'user',
            description: 'The user to check points of',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        
    ],
    callback: async ({interaction, client}) => {

        const user = interaction.options.getMember('user')


        const userPoints = await Points.findOne({ userID: user.id });

        if (!userPoints) {
            await interaction.reply(`<@${user.id}> has no points.`);
        } else {
            await interaction.reply(`<@${user.id}> has ${userPoints.points} points.`);
        }
        }
        
}
