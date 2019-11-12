const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    usr: 
    {
        type: String,
        required: true
    },
    pass: 
    {
        type: String,
        required: true
    },
    adrs: 
    {
        type: String,
        required: true
    },
    pNum: 
    {
        type: String,
        required: true
    },
    eml: 
    {
        type: String,
        required: true
    }
});


// CREATE MODEL
const User = mongoose.model('users', userSchema);

module.exports = User;