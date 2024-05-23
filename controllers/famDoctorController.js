const famDoctor = require('../models/famDoctor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { create } = require('../models/Doctor')
require('dotenv').config

                            // next - bolmagy mumkin
const addFamDoctor = async (req, res) => {
    const {firstName, lastName, username, hospital, email, password} = req.body

    const passwordHash = await bcrypt.hash(password, 10)
    if (password.length < 6) {
        return res.bodystatus(500).json({ message: "Password length min 6" })
    }

    const newFamDoctor = await famDoctor.create({ firstName, lastName, username, hospital, email, password: passwordHash })

    const token = await jwt.sign({id: newFamDoctor._id}, process.env.JWT_SECRET, {expiresIn: "12h"})

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(201).cookie("token", token, cookieOptions).json({
        newFamDoctor,
        token
    })
}

const login = async (req, res) => {
    const {username, password} = req.body

    const famDoctor = await famDoctor.findOne({username})
    if (!famDoctor) {
        return res.status(500).json({ message: "Family doctor not found" })
    }

    const comparePassword = await bcrypt.compare(password, famDoctor.password)
    if (!comparePassword) {
        return res.status(500).json({ message: "Password error" })
    }

    const token = await jwt.sign({id: famDoctor._id}, process.env.JWT_SECRET, {expiresIn: "12h"})

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(200).cookie("token", token, cookieOptions).json({
        famDoctor,
        token
    })
}

const logout = async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now())
    }

    res.status(200).cookie("token", null, cookieOptions)
}

const update = async (req, res) => {

}

const profile = async (req, res) => {
    const famDoctor = await Doctor.findById(req.user.id)
    res.status(200).json({
        famDoctor
    })
}

module.exports = {addFamDoctor, login, logout, profile}