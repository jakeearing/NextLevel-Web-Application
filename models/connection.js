const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    topic: {type: String, required: [true, 'topic is required']},
    title: {type: String, required: [true, 'title is required']},
    description: {type: String, required: [true, 'description is required'], 
    minLength: [10, 'The description must be at least 10 characters']},
    host: {type: String, required: [true, 'host is required']},
    date: {type: Date, required: [true, 'Date is required']},
    start: {type: String, required: [true, 'start time is required']},
    end: {type: String, required: [true, 'end time is required']},
    location: {type: String, required: [true, 'location is required']},
    image: {type: String, required: [true, 'Image is required']},
});

//Collection name is connections in the database
module.exports = mongoose.model('Connection', connectionSchema);

