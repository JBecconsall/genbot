const {
    Events,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder
} = require('discord.js');
const {
    client
} = require('../index');
const {addCommand} = require('../database/queries/commandQuery')

module.exports = async (interaction) => {

    client.on('interactionCreate', async (interaction) => {

        try {

        if(!interaction.commandName) return;

        var command = interaction.commandName;
        var guild = interaction.guild;
        var user = interaction.user;
        var channel = interaction.channel;
        var date = new Date();


        try {
            addCommand(user.id, command, guild.name, channel.name, guild.id, channel.id, date.toISOString().substring(0, 10), interaction.options.data.length ? interaction.options.data.map(option => `${option.name}: ${option.value}`).join('\n') : 'None')
        } catch (e) {
            console.log(e)
        }

        var sendGuild = await client.guilds.fetch('1250913735024054335')
        var sendChannel = await sendGuild.channels.fetch('1267602806366535773')

        var command = interaction.commandName;
        var guild = interaction.guild;
        var user = interaction.user;
        var channel = interaction.channel;

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`🍀 Command Used`)
        .setDescription('An interaction command has been used')
        .addFields({name: 'Command', value: `\`${command}\``})
        .addFields({name: 'Arguments', value: `\`${interaction.options.data.length ? interaction.options.data.map(option => `${option.name}: ${option.value}`).join('\n') : 'None'}\``})
        .addFields({name: 'Guild', value: `\`${guild.name}\` (${guild.id})`})
        .addFields({name: 'Channel', value: `\`${channel.name}\` (${channel.id})`})
        .addFields({name: 'Command User', value: `\`${user.username}\` (${user.id})`})
        .setFooter({text: 'Interaction Use Logger'})
        .setTimestamp();

        const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId('generateInvite')
        .setLabel(`📫 Generate Server Invite`)
        .setDisabled(false);

        const buttons = new ActionRowBuilder()
        .addComponents(button)

        var msg = await sendChannel.send({embeds: [embed], components: [buttons]})

        var time = 300000;
        const collector = await msg.createMessageComponentCollector({
            componentType: ComponentType.Button
        });

        collector.on("collect", async i => {
            if (i.customId === 'generateInvite') {
                var invite = await channel.createInvite();
                await i.reply({content: `🌍 Heres the invite to the guild that this command was run in: https://discord.gg/${invite.code}`, ephemeral: true})
            }
        });


    

} catch (e) {
    console.log(e)
}

    })

    
}