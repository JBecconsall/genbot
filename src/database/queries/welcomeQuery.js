const welcome = require('../schemas/welcomeSchema');

const createWelcome = async (message, channelID) => {
    const query = new welcome({message: message, channelID: channelID});
    await query.save();

    return query;
}


module.exports = {
    createWelcome,
}