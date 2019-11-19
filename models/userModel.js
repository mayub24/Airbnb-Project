const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
    },
    type:
    {
        type: String,
        default: 'User'
    },
    dateCreated:
    {
        type: Date,
        default:Date.now(),
    }
});

// Adding encryption
userSchema.pre("save", function(next)
{
    bcrypt.genSalt(10) // when genSalt is resolved...
    .then((salt) =>
    {
        bcrypt.hash(this.pass, salt) // i want to hash pass with the salt
        .then((hash) =>
        {
            this.pass = hash; // then make the pass = to the hash

            next();
        });
    })
});

// CREATE MODEL
const User = mongoose.model('users', userSchema);

module.exports = User;