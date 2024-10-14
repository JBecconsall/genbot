const {
    ApplicationCommandOptionType, EmbedBuilder
} = require('discord.js');
const ShortUniqueId = require('short-unique-id');
const {
    CommandType
} = require('wokcommands');
const { randomUUID } = new ShortUniqueId({length: 10});
const config = require('../../data/config.json')
module.exports = {
    category: 'Moderation',
    name: 'ban',
    description: 'Ban a user from the guild',
    type: CommandType.SLASH,
    testOnly: true,
    options: [{
            name: 'user',
            description: 'The user to ban',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'reason',
            description: 'The reason for banning the user',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'evidence',
            description: 'The link to the evidence',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async({interaction}) => {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const banID = randomUUID();
        const evidence = interaction.options.getString('evidence');

        const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this.')
            .setColor('Red')
            .setTimestamp()

        const success = new EmbedBuilder()
        .setTitle('User Banned')
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .setColor('Green')
        .setTimestamp()
        .addFields(
            {name: 'Member Banned', value: `${user.tag} \`(${user.id})\``, inline: true},
            {name: 'Reason', value: `${reason}`, inline: true},
            {name: 'Punishment ID', value: `\`${banID}\``}
        )

        const logEmbed = new EmbedBuilder()
        .setTitle('User Banned')
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .setColor('DarkAqua')
        .setTimestamp()
        .addFields(
            {name: 'Offender', value: `<@${user.id}> \`(${user.id})\``, inline: true},
            {name: 'Moderator', value: `<@${interaction.user.id}> \`(${interaction.user.id})\``, inline: true},
            {name: 'Reason', value: `\`${reason}\``},
            {name: 'Punishment ID', value: `\`${banID}\``}
        )
        .setThumbnail(user.displayAvatarURL())

        const notifyEmbed = new EmbedBuilder()
        .setTitle('⚠️ Moderation Alert')
        .setDescription('You have been banned from the server. Please read the rules and do not violate them.')
        .addFields(
            {name: 'Reason', value: `\`${reason}\``, inline: true},
            {name: 'Punishment ID', value: `\`${banID}\``}
        )
        .setColor('Red')
        .setTimestamp()


        if (!interaction.member.roles.cache.has(config.PERM_BAN)) { 
            interaction.reply({embeds: [errorEmbed], ephemeral: true})
        } else {

            var date = new Date();

            await interaction.guild.bans.create(user, {reason: `${interaction.user.tag} - ${reason}`}).then(() => { interaction.reply({embeds: [success], ephemeral: true}) })
            try {
                user.send({embeds: [notifyEmbed]})
            } catch (e) {
                console.log(e)
            }

            let logChannel = interaction.guild.channels.cache.find(c => c.id === config.DATA_MODLOGS)
            await logChannel.send({embeds: [logEmbed]})

        }

    }
}