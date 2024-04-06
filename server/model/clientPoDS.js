const mongoose = require('../config/config')

const ClientPoSchema = new mongoose.Schema({


    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    quotation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quotation', required: true },

    
    clientPo: {
        type: String,
        required: true
      },


      date: {
        type: String,
        required: true
      },

     
 
}, { timestamps: true })

const clientPO = new mongoose.model("client-po" , ClientPoSchema)

module.exports =  clientPO 