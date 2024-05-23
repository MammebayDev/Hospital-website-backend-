const Patient = require('../models/Patient')
const PatientFilter = require('../utils/PatientFilter')

const getAllPatient = async (req, res) => {
    try {
        const resultPerPage = 10
        const patientFilter = new PatientFilter(Patient.find(), req.query).search().filter().pagination(resultPerPage)

        const patients = await patientFilter.query

        res.status(200).json(patients)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getByIdPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)

        res.status(200).json(patient)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
} 
// Admin
const createPatient = async (req, res) => {
    try {
        const newPatient = await Patient.create(req.body)

        res.status(201).json(newPatient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updatePatient = async (req, res) => {
    try {
        let patient = await Patient.findById(req.params.id)

        patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json(patient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)

        await patient.remove()

        res.status(200).json({ message: 'Patient deleted' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {getAllPatient, getByIdPatient, createPatient, updatePatient, deletePatient}