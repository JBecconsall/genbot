const { Schema, mongoose } = require('mongoose');

const command = new Schema({
    userId: {
        type: String,
        required: true
    },
    commandRun: {
        type: String,
        required: true
    },
    serverRun: {
        type: String,
        required: true
    },
    channelRun: {
        type: String,
        required: true
    },
    serverId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    runAt: {
        type: String,
        required: true
    },
    arguments: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('commandsRun', command);