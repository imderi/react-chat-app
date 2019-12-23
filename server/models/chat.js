const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user: String,
    message: String
});

module.exports = mongoose.model('Chat', chatSchema);