const mongoose = require('mongoose')

const famDoctorSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    role: {type: String, default: "famDoctor"},
    hospital: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, unique: true, minlength: 6}
})

module.exports = mongoose.model('famDoctor', famDoctorSchema)