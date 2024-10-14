const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
const config  = require('../../data/config.json');
module.exports = {
    category: 'Utils',
    name: 'addrole',
    description: 'Adds a role to the user',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'user',
            description: 'The user to give a role to',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'role',
            description: 'Role to give to the user',
            required: true,
            type: ApplicationCommandOptionType.Role
        }
    ],
    callback: ({interaction, client}) => {

        const user = interaction.options.getMember('user')
        const role = interaction.options.getRole('role')
        let roleToAdd = interaction.member.guild.roles.cache.find(r1 => r1.id === role.id);

        const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this.')
            .setColor('Red')
            .setTimestamp()



        if (!interaction.member.roles.cache.has(config.PERM_ADDROLE)) { 

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
                user.roles.add(roleToAdd)
                const success = new EmbedBuilder()
                    .setTitle("Role Added")
                    .setDescription(`✅ Successfully added ${role} to ${user}`)
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setColor('#1df028')
                    .setFooter({text: `Command executed by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})


               
                interaction.reply({embeds: [success]})
                

            }
        } 
        
    }
}
