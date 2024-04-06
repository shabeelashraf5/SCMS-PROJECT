const mongoose = require('../config/config')

const shipmentSchema = new mongoose.Schema({


    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'invoice', required: true },

    
    shipment: {
        type: String,
        unique: true,
      },

      

      status: {
        type: String,
        enum: ['Not Delivered', 'Delivered'],
        default: 'Not Delivered',
      },
    
 
}, { timestamps: true })

const collectionshipment = new mongoose.model("shipment" , shipmentSchema)

module.exports =  collectionshipment