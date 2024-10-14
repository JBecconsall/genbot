const { client } = require("../index")
const fetchWelcome = require('../database/schemas/welcomeSchema')
module.exports = async () => {

    client.on('guildMemberAdd', async (member) => {
        const welcomeData = await fetchWelcome.findOne({channelID: member.guild.systemChannelId});

        if (welcomeData) {
            const welcomeMsg = welcomeData.message.reply('{user}', `<@${member.id}>`)

            const welcomeChannel = member.guild.channels.cache.get(welcomeData.channelID);

            if (welcomeChannel) {
                welcomeChannel.send(welcomeMsg)
            }
        }
    })
}