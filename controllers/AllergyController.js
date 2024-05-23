const Allergy = require('../models/Allergy')
const Patient = require('../models/Patient')
require('dotenv').config

const getAllergy = async (req, res) => {
    try {
        const patientId = req.params.id
        
        const allergy = await Allergy.find({patient: patientId}) 
        if(!allergy) {
            return res.status(404).json({message: "Patients allergy not found"})
        }

        res.status(200).json(allergy)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createAllergy = async (req, res) => {
    try {
        const {allergen} = req.body
        const patientId = req.params.id

        const patient = await Patient.findById(patientId)
        if(!patient) {
            return res.status(404).json({message: "Patient not found"})
        }

        const allergy = await Allergy.create({allergen: allergen, patient: patient._id})

        res.status(201).json(allergy)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const updateAllergy = async (req, res) => {
    try {
        let allergy = await Allergy.findById(req.params.id)

        allergy = await Allergy.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json(allergy)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteAllergy = async (req, res) => {
    try {
        await Allergy.findByIdAndDelete(req.params.id)
        
        res.status(200).json({message: "allergy deleted succesfull"})

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {getAllergy, createAllergy, updateAllergy, deleteAllergy}