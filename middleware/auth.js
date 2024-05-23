const Admin = require('../models/Admin.js')
const jwt = require("jsonwebtoken")
require("dotenv").config

// admin login bolan bolmaly
const authenticationMid = async(req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // req.cookies req.headers["auhtorization"]   --- cookieden aljak bolsam

    console.log(token); 

     if(!token) {
        return res.status(401).json({
            message: "Token not found!"
        }) 
    }
    if(token) {
        req.user = await Admin.findById(
            jwt.verify(token, process.env.JWT_SECRET).id
        )    
    }
    
    next()
} 

// admin bolmaly
const roleChecked = (...roles) => {
    return (req,res,next) => { 
        if(!req.user.role === roles) {
            return res.status(500).json({
                message: "For only admins!"
            })
        } 
        next()
    } 
}

module.exports = {authenticationMid, roleChecked}