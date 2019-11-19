const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema
(
    {
        name:
        {
            type: String,
            required: true
        },
        location:
        {
            type: String,
            required: true
        },
        roomz:
        {
            type: Number,
            required: true
        },
        bedz:
        {
            type: Number,
            required: true
        },
        bathrooms:
        {
            type: Number,
            required: true
        },
        floors:
        {
            type: Number,
            required: true
        },
        guests:
        {
            type: Number,
            required: true
        },
        price:
        {
            type: Number,
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
            default: Date.now()
        }
    }
)

const roomz = mongoose.model('rooms', roomSchema);

module.exports = roomz;