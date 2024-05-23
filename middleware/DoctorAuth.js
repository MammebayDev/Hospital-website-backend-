const Doctor = require('../models/Doctor.js')
const jwt = require("jsonwebtoken")
require("dotenv").config


const authenticationMidDoc = async(req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // req.cookies req.headers["auhtorization"]   --- cookieden aljak bolsam

    
     if(!token) {
        return res.status(401).json({
            message: "Token not found!"
        }) 
    }

    req.user = await Doctor.findById(
        jwt.verify(token, process.env.JWT_SECRET).id
    )

    next()

}

// admin bolmaly
const roleCheckedDoc = (...roles) => {
    return (req,res,next) => {
        if(!req.user.role === roles) {
            return res.status(500).json({
                message: "For only doctors!"
            })
        } 
        next()
    }
}

module.exports = {authenticationMidDoc, roleCheckedDoc}