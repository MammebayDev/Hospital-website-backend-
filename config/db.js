const mongoose = require('mongoose')

const db = () => {
    mongoose.connect('mongodb://127.0.0.1/projectalpha_db')
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = db