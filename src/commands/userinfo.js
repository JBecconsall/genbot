const {
    MessageEmbed,
    MessagePayload,
    Message,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    EmbedBuilder,
    ApplicationCommandOptionType,
} = require("discord.js");
const {
    CommandType
} = require("wokcommands");

module.exports = {
    category: 'Utils',
    name: 'userinfo',
    description: "View a users profile",
    type: CommandType.SLASH,
    testOnly: true,
    options: [{
        name: 'user',
        description: 'The user to check the profile for',
        required: false,
        type: ApplicationCommandOptionType.User
    }, ],


    callback: async ({
        interaction,
        client
    }) => {

        

        const user = interaction.options.getUser('user') || interaction.user;

        const member = interaction.guild.members.cache.get(user.id);

        const roles = member.roles.cache
            .filter(role => role.id !== interaction.guild.id)
            .sort((a, b) => b.position - a.position)
            .first(5)
            .map(role => role.toString())
            .join(', ');

        const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s Profile`)
        .setColor('Random')
        .addFields(
            {
                name: 'Name',
                value: `${user.username}#${user.discriminator}`
            },
            {
                name: 'ID',
                value: `${user.id}`
            },
            {
                name: 'Created At',
                value: `${user.createdAt}`
            },
            {
                name: 'Roles',
                value: `${roles}`
            },
            {
                name: 'Joined At',
                value: `${member.joinedAt}`
            },
            {
                name: 'Bot',
                value: `${user.bot ? 'Yes' : 'No'}`
            },
        )
        .setTimestamp()

        await interaction.reply({embeds: [embed]})
    }
}
