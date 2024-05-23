const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
require('dotenv').config
const db = require('./config/db.js')
const PatientRoute = require('./routes/PatientRoute.js')
const AdminRoute = require('./routes/AdminRoute.js')
const DoctorRoute = require('./routes/DoctorRoute.js')
const famDoctorRoute = require('./routes/famDoctorRoute.js')
const MedicalHistoryRoute = require('./routes/MedicalHistoryRoute.js')
const AppointmentRoute = require('./routes/AppointmentRoute.js')
const AllergyRoute = require('./routes/AllergyRoute.js')

dotenv.config();

const app = express()

app.use(cors())
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cookieParser())

db()

app.use('/', PatientRoute)
app.use('/', AdminRoute)
app.use('/', DoctorRoute)
app.use('/', famDoctorRoute)
app.use('/', MedicalHistoryRoute)
app.use('/', AppointmentRoute)
app.use('/', AllergyRoute)


const port = 2007
const hostName = '127.0.0.1'
app.listen(port, hostName, () => {
    console.log(`Server running, http://${hostName}:${port}`)
})


console.log(process.env.JWT_SECRET)