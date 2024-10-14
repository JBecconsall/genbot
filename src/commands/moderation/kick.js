const {
    ApplicationCommandOptionType, EmbedBuilder
} = require('discord.js');
const ShortUniqueId = require('short-unique-id');
const {
    CommandType
} = require('wokcommands');
const config = require('../../data/config.json')
const { randomUUID } = new ShortUniqueId({length: 10});
module.exports = {
    category: 'Moderation',
    name: 'kick',
    description: 'Kick a user from the guild',
    type: CommandType.SLASH,
    guildOnly: true,
    options: [{
            name: 'user',
            description: 'The user to kick',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'reason',
            description: 'The reason for kicking the user',
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
        const kickID = randomUUID();
        const member = interaction.guild.members.cache.get(user.id);
        const evidence = interaction.options.getString('evidence');

        const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this.')
            .setColor('Red')
            .setTimestamp()

        const success = new EmbedBuilder()
        .setTitle('User Kicked')
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor('Green')
        .setTimestamp()
        .addFields(
            {name: 'Member Kicked', value: `${user.tag} \`(${user.id})\``, inline: true},
            {name: 'Reason', value: `${reason}`, inline: true},
            {name: 'Punishment ID', value: `\`${kickID}\``}
        )

        const logEmbed = new EmbedBuilder()
        .setTitle('User Kicked')
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor('DarkAqua')
        .setTimestamp()
        .addFields(
            {name: 'Offender', value: `<@${user.id}> \`(${user.id})\``, inline: true},
            {name: 'Moderator', value: `<@${interaction.user.id}> \`(${interaction.user.id})\``, inline: true},
            {name: 'Reason', value: `\`${reason}\``},
            {name: 'Punishment ID', value: `\`${kickID}\``},
            {name: 'Evidence Link', value: `${evidence}`}
        )
        .setThumbnail(user.displayAvatarURL())

        const notifyEmbed = new EmbedBuilder()
        .setTitle('⚠️ Moderation Alert')
        .setDescription('You have been kicked from the server. Please contact the server owner if you believe this was a mistake.')
        .addFields(
            {name: 'Reason', value: `\`${reason}\``, inline: true},
            {name: 'Punishment ID', value: `\`${kickID}\``}
        )
        .setColor('Red')
        .setTimestamp()

        if (!interaction.member.roles.cache.has(config.PERM_KICK)) { 
            interaction.reply({embeds: [errorEmbed], ephemeral: true})
        } else {

            try {
            var date = new Date();

            await member.kick(reason);
            interaction.reply({embeds: [success], ephemeral: true})
            await member.send({embeds: [notifyEmbed]})

            let logChannel = interaction.guild.channels.cache.find(c => c.id === '1270477239175086142')
            await logChannel.send({embeds: [logEmbed]})
            } catch (e) {
                console.log(e)
            }

        }

    }
}