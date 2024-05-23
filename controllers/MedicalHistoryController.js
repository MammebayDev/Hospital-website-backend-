const MedicalHistory = require('../models/MedicalHistory')
const Patient = require('../models/Patient')
require('dotenv').config

const getMedicalHistory = async (req, res) => {
    const patientId = req.params.id

    try {
        const medicalHistory = await MedicalHistory.find({patient: patientId})
        
        if(!medicalHistory) {
            return res.status(404).json({message: 'Patients medical history not found'})
        }

        res.status(200).json(medicalHistory)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createMedicalHistory = async (req, res) => {
    try {
        const {diagnosis, treatments} = req.body
        const patientId = req.params.id

        const patient = await Patient.findById(patientId)
        if(!patient) {
            return res.status(404).json({message: "Patient not found"})
        }

        const medicalHistory = new MedicalHistory({
            diagnosis,
            treatments,
            patient: patient._id
        })

        await medicalHistory.save()

        res.status(201).json(medicalHistory)

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

module.exports = {getMedicalHistory, createMedicalHistory}

/* const createMedicalHistory = async (req, res) => {
    try {
        const {diagnosis, treatments} = req.body
        const patientId = req.params.patientId 

        const medicalHistory = await MedicalHistory.create({diagnosis: diagnosis, treatments: treatments, patient: patientId})

        res.status(201).json(medicalHistory)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }    
} */