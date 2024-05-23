const express = require('express')
const { getAllPatient, getByIdPatient, createPatient, updatePatient, deletePatient } = require('../controllers/PatientController')
const router = express.Router()

router.get('/patients', getAllPatient);
router.get('/patients/:id', getByIdPatient);
router.post('/patient/new', createPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

module.exports = router