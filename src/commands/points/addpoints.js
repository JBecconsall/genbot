const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
const config  = require('../../data/config.json');
const Points = require('../../database/schemas/pointsSchema')
module.exports = {
    category: 'Utils',
    name: 'addpoints',
    description: 'Adds points to the user',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'user',
            description: 'The user to give points to',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'points',
            description: 'The amount of points to give',
            required: true,
            type: ApplicationCommandOptionType.Integer
        }
    ],
    callback: async ({interaction, client}) => {

        const user = interaction.options.getMember('user')
        const points = interaction.options.getInteger('points')

        const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this.')
            .setColor('Red')
            .setTimestamp()



        if (!interaction.member.roles.cache.has(config.PERM_ADDPOINTS)) { 

            interaction.reply({embeds: [errorEmbed], ephemeral: true})
        } else {

            let userPoints = await Points.findOne({userID: user.id})

            if (!userPoints) {
                // Create a new entry if the user doesn't exist in the points database
                userPoints = new Points({
                    userID: user.id,
                    points: points
                });
            } else {
                // Update points if the user already exists
                userPoints.points += points;
            }
    
            await userPoints.save();
    
            await interaction.reply(`${points} points added to <@${user.id}>. They now have ${userPoints.points} points.`);
        }
        
    }
}
