const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    status: {type: String, required: [true, 'Status is required']},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    event: {type: Schema.Types.ObjectId, ref: 'Connection'},
});

module.exports = mongoose.model('Rsvp', connectionSchema);