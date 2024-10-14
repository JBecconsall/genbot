const command = require("../schemas/commandSchema")

const addCommand = async (userId, commandRun, serverRun, channelRun, serverId, channelId, runAt, arguments) => {
    const query = new command({userId: userId, commandRun: commandRun, serverRun: serverRun, channelRun: channelRun, serverId: serverId, channelId: channelId, runAt: runAt, arguments: arguments});
    await query.save();

    return query;
}

module.exports = {
    addCommand
}