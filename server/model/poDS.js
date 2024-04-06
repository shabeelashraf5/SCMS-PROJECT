const mongoose = require('../config/config')

const purchasePoSchema = new mongoose.Schema({


    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    quotation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quotation', required: true },
   

    
    po: {
        type: String,
        unique: true,
      },


      status: {
        type: String,
        enum: ['not submitted', 'Submitted'],
        default: 'not submitted',
      },

     
 
}, { timestamps: true })

const purchasePO = new mongoose.model("purchase-po" , purchasePoSchema)

module.exports =  purchasePO 
