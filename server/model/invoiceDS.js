const mongoose = require('../config/config')

const invoicingSchema = new mongoose.Schema({


    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    purchase_id: { type: mongoose.Schema.Types.ObjectId, ref: 'purchase-order', required: true },

    
    invoice: {
        type: String,
        unique: true,
      },

      delivery: {
        type: String,
        unique: true,
      },


      transaction: {

        type: String,
        unique: true,

      },

      
      status: {
        type: String,
        enum: ['not confirmed', 'Confirmed'],
        default: 'Not confirmed',
      },


      payment: {
        type: String,
        enum: ['to be Paid', 'Paid'],
        default: 'to be Paid',
      },
    
 
} , { timestamps: true })

const invoicing = new mongoose.model("invoice" , invoicingSchema)

module.exports =  invoicing