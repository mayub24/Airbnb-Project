const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName:
    {
        type: String,
        required: true
    },
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
    eml: 
    {
        type: String,
        required: true
    },
    // HOW DO I ADD ADMINISTRATOR HERE? ANOTHER COLUMN? another type?
    type:
    {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    dateCreated:
    {
        type: Date,
        default:Date.now()
    },
    bookedRooms: // array of objects
    [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "rooms"
        }
    ]
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