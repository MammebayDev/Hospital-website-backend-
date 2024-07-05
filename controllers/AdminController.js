const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const register = async (req, res, next) => {
    const { username, email, password } = req.body

    const admin = await Admin.findOne({ username })
    if (admin) {
        return res.status(500).json({ message: "Admin exist!" })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    if (password.length < 6) {
        return res.status(500).json({ message: "Password length min 6" })
    }

    const newAdmin = await Admin.create({ username, email, password: passwordHash })

    const token = await jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "12h" })

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(201).cookie("token", token, cookieOptions).json({
        newAdmin,
        token
    })

}

const login = async (req, res) => {
    const  {username, password} = req.body

    const admin = await Admin.findOne( {username} )

    if (!admin) {
        return res.status(500).json({ message: "Admin not found" })
    }

    const comparePassword = await bcrypt.compare(password, admin.password)

    if (!comparePassword) {
        return res.status(500).json({ message: "Password error" })
    }

    const token = await jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "12h" })

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }// 
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000*60*60*24*5,
    })
    res.status(200).json({
        admin,
        token
    })

}

const profile = async (req, res, next) => {
    const admin = await Admin.findById(req.user.id)
    if(!admin) {
        res.status(500).json({message: "Admin not found by id"})
    } else {
        res.status(200).json({
            admin
        })
    }
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

const forgotPassword = async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email })

    if (!admin) {
        return res.status(404).json({
            message: "Admin not found"
        })
    }

    const resetToken = crypto.randomBytes(20).toString('hex')

    admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    admin.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    await admin.save({ validateBeforeSave: false })

    const passwordUrl = `${req.protocol}://${req.get('host')}/reset/${resetToken}`
    const message = `New Password token: ${passwordUrl}`

    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            service: "gmail",
            host: "smpt.gmail.com",
            auth: {
                user: 'example@email.com', // email
                pass: 'ExamplePassword', // password
            },
            secure: true,
        })

        const mailData = {
            from: 'example@email.com',
            to: req.body.email,
            subject: 'New password token',
            text: message,
        }

        await transporter.sendMail(mailData)
        res.status(200).json({message: "Control your email"})

    } catch (error) {
        admin.resetPasswordToken = undefined
        admin.resetPasswordExpire = undefined
        await admin.save({ validateBeforeSave: false })
        res.status(500).json({ message: error.message })
    }

}

const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

    const admin = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
    if(!admin) {
        res.status(403).json({message: "Token error"})
    }

    admin.password = req.body.password
    admin.resetPasswordExpire = undefined
    admin.resetPasswordToken = undefined

    await admin.save()

    const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: "12h"})

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(201).cookie("token", token, cookieOptions).json({
        admin,
        token
    })
}

module.exports = { register, login, profile, logout, forgotPassword, resetPassword}
