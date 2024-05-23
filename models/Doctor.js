const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    role: {type: String, default: "doctor"},
    hospital: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, unique: true, minlength: 6}
})

module.exports = mongoose.model('Doctor', doctorSchema)

// add Avatar