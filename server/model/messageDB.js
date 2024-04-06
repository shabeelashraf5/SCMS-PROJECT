const mongoose = require('../config/config')

const MessageSchema = new mongoose.Schema({
    

    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },

    message: {type: String, required: true } ,

    date: {
        type: Date,
        default: Date.now
    }


})

const collectionmessage = new mongoose.model("em-message" , MessageSchema)

module.exports =  collectionmessage