const express = require('express')
const router = express.Router()
const {addFamDoctor, login, logout, profile} = require('../controllers/famDoctorController.js')
const {authenticationMid, roleChecked} = require('../middleware/auth.js')


router.post('/addFamDoctor', authenticationMid, roleChecked("admin"), addFamDoctor)
router.post('/famDoctorLogin', login)
router.get('/famDoctorLogout', logout)
router.get('famDoctorProfile', profile)

module.exports = router