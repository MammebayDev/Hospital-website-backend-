const mongoose = require('mongoose')

// diagnosis - diyagnoz | treatments - Bejergi

const medicalHistorySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    diagnosis: {type: String},
    treatments: [{type: String}]
})

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema)