const {
    EmbedBuilder,
    MessagePayload,
    ApplicationCommandOptionType,
    PermissionsBitField,
    Embed
} = require("discord.js");
const {
    CommandType
} = require("wokcommands");
const { description } = require("./hello");

module.exports = {
    category: 'Utils',
    name: 'echo',
    description: 'Echo....',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
    {
        name: 'message',
        description: 'The message to echo',
        required: true,
        type: ApplicationCommandOptionType.String
    }
    ],
    callback: async ({
        interaction,
        client
    }) => {

        const msg = interaction.options.getString('message');

        const embed = new EmbedBuilder()
        .setTitle('Echo echo echo...')
        .setDescription(`\`${msg}\``)
        .setColor('Random')
        .addFields(
            {
                name: 'Word Count',
                value: `\`${msg.split(' ').length}\``
            }
        )
        .setTimestamp()

        await interaction.reply({embeds: [embed]})
        
    }
};