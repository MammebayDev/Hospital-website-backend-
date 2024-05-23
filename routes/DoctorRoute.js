const express = require('express')
const router = express.Router()
const {addDoctor, login, logout, profile} = require('../controllers/DoctorController.js')
const {authenticationMid, roleChecked} = require('../middleware/auth.js')
const {authenticationMidDoc, roleCheckedDoc} = require('../middleware/DoctorAuth.js')


router.post('/addDoctor', authenticationMid, roleChecked("admin"), addDoctor)
router.post('/doctorLogin', login)
router.get('/doctorLogout', logout)
router.get('/doctorProfile', authenticationMidDoc, roleCheckedDoc("doctor"), profile)

module.exports = router

//