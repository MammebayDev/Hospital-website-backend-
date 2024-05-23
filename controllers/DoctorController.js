const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config

// next - bolmagam mumkin
const addDoctor = async (req, res) => {
    const { firstName, lastName, username, hospital, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)
    if (password.length < 6) {
        return res.status(500).json({ message: "Password length min 6" })
    }

    const newDoctor = await Doctor.create({ firstName, lastName, username, hospital, email, password: passwordHash })

    const token = await jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET, { expiresIn: "12h" })

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(201).cookie("token", token, cookieOptions).json({
        newDoctor,
        token
    })
}

const login = async (req, res) => {
    const { username, password } = req.body

    const doctor = await Doctor.findOne({ username })

    if (!doctor) {
        return res.status(500).json({ message: "Doctor not found" })
    }

    const comparePassword = await bcrypt.compare(password, doctor.password)

    if (!comparePassword) {
        return res.status(500).json({ message: "Password error" })
    }

    const token = await jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "12h" })

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(200).cookie("token", token, cookieOptions).json({
        doctor,
        token
    })
}

const logout = async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now())
    }

    res.status(200).cookie("token", null, cookieOptions).json({
        message: "logout succesfull"
    })
}

const update = async (req, res) => {

}

const profile = async (req, res) => {
    const doctor = await Doctor.findById(req.user.id)
    res.status(200).json({
        doctor
    })
}

module.exports = { addDoctor, login, logout, profile}