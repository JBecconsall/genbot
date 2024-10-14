const { Schema, mongoose } = require('mongoose');

const welcome = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        channelID: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('welcome', welcome)