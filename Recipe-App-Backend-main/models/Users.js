const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    roles: {
        User: { 
            type: Number,
            default: 80085
        },
        Admin: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;