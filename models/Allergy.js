const mongoose = require('mongoose')

const allergySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    allergen: {type: String, required: true}
})

module.exports = mongoose.model('Allergy', allergySchema)