const express = require('express')
const router = express.Router()
const { register, login, logout, forgotPassword, resetPassword, profile } = require('../controllers/AdminController.js')
const { authenticationMid, roleChecked } = require("../middleware/auth.js")

router.post('/adminRegister', authenticationMid, roleChecked("admin"), register) 
router.post('/adminLogin', login)
router.get('/adminProfile', authenticationMid, roleChecked("admin"), profile) //
router.get('/adminLogout', authenticationMid, logout)
router.post('/adminForgotPassword', authenticationMid, forgotPassword)
router.post('/reset/:token', authenticationMid, resetPassword)

module.exports = router

// 