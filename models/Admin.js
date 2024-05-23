const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    password: {type: String, required: true, minlength: 6},
    role: {type: String, default: "admin"},
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {timestamps: true})

module.exports = mongoose.model('Admin', adminSchema)

// add avatar
