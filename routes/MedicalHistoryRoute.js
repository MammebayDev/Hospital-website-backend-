const express = require('express')
const router = express.Router()
const {getMedicalHistory, createMedicalHistory} = require('../controllers/MedicalHistoryController.js')

router.get('/patients/:id/getMedicalHistory', getMedicalHistory)
router.post('/patients/:id/createMedicalHistory', createMedicalHistory)

module.exports = router
///