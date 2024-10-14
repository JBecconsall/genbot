const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Points', pointsSchema);
