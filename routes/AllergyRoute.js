const express = require('express')
const router = express.Router()
const { getAllergy, createAllergy, updateAllergy, deleteAllergy } = require('../controllers/AllergyController.js')

router.get('/patients/:id/getAllergy', getAllergy)
router.post('/patients/:id/createAllergy', createAllergy)
router.put('/patients/:id/updateAllergy', updateAllergy)
router.delete('/patients/:id/deleteAllergy', deleteAllergy)

module.exports = router