const express = require('express')
const router = express.Router()
const {getAppointment, createAppointment} = require('../controllers/AppointmentController.js')
const {authenticationMidDoc, roleCheckedDoc} = require('../middleware/DoctorAuth.js')

router.get('/patients/:id/getAppointment', getAppointment)
router.post('/patients/:id/createAppointment',authenticationMidDoc, roleCheckedDoc("doctor"), createAppointment)

module.exports = router