const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const jwt = require('jsonwebtoken')
require('dotenv').config

const getAppointment = async (req, res) => {
    try {
        const patientId = req.params.id

        const appointment = await Appointment.find({ patient: patientId })

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" })
        }

        res.status(200).json(appointment)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createAppointment = async (req, res) => {
    try {
        const { token } = req.headers.authorization.split(" ")[1]; // req.cookies --- bolmagam mumkin 
        if (!token) {
            return res.status(500).json({ message: "Token not found" })
        }

        const decodedData = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedData) {
            return res.status(500).json({ message: "Token not found" })
        }
        // req.doctor = await Doctor.findById(decodedData.id)

        const reason = req.body
        const patientId = req.params.id
        const doctor = await Doctor.findById(decodedData.id)
        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }

        const patient = await Patient.findById(patientId)
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" })
        }

        const appointment = new Appointment({
            reason,
            patient: patient._id,
            doctor: doctor._id
        })

        await appointment.save()

        res.status(201).json({appointment})

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getAppointment, createAppointment }