const mongoose = require('mongoose');

const Schema = mongoose.Schema

const logSchema = new Schema({
    log: {
        type: String,
        required: true
    },
    deviceInfo: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Log', logSchema);
