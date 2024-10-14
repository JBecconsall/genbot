const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
const config  = require('../../data/config.json');
module.exports = {
    category: 'Utils',
    name: 'removerole',
    description: 'remove a role from the user',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'user',
            description: 'The user to remove a role from',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'role',
            description: 'Role to remove from the user',
            required: true,
            type: ApplicationCommandOptionType.Role
        }
    ],
    callback: ({interaction, client}) => {

        const user = interaction.options.getMember('user')
        const role = interaction.options.getRole('role')
        let roleToRemove = interaction.member.guild.roles.cache.find(r1 => r1.id === role.id);

        const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this.')
            .setColor('Red')
            .setTimestamp()



        if (!interaction.member.roles.cache.has(config.PERM_REMOVEROLE)) { 

            interaction.reply({embeds: [errorEmbed], ephemeral: true})
        } else {

            const denied = new EmbedBuilder()
            .setTitle('Error')
                .setDescription(`❌ You cannot do this as ${role} is higher than your highest role (${interaction.member.roles.highest})`)
                .setColor('Red')
                .setTimestamp()

    
            if (interaction.member.roles.highest.position < role.position) {
                interaction.reply({embeds: [denied]})
            } else {
                user.roles.remove(roleToRemove)
                const success = new EmbedBuilder()
                    .setTitle("Role Added")
                    .setDescription(`✅ Successfully removed ${role} from ${user}`)
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setColor('#1df028')
                    .setFooter({text: `Command executed by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})


               
                interaction.reply({embeds: [success]})
                

            }
        } 
        
    }
}
