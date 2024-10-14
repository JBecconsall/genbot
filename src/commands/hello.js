const {
    EmbedBuilder,
    MessagePayload,
    ApplicationCommandOptionType,
    PermissionsBitField
} = require("discord.js");
const {
    CommandType
} = require("wokcommands");

module.exports = {
    category: 'Utils',
    name: 'hello',
    description: 'Greet a user!',
    testOnly: true,
    type: CommandType.SLASH,
    callback: async ({
        interaction,
        client
    }) => {

        const emojiList = ['🎊', '👋', '✅', '🧡']

        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

        await interaction.reply({content: `Hey there, ${interaction.user.tag}! Welcome to the server! ${randomEmoji}`})
        
    }
};