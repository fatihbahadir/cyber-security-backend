const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    receivedTime: {
        type: Date,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receivedByName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Email', emailSchema);
