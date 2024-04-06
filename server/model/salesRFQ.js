const mongoose = require('../config/config')

const SalesRfqSchema = new mongoose.Schema({


    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    
    srfq: {
        type: String,
        unique: true,
      },


    status: {
    type: String,
    enum: ['not submitted', 'Submitted'],
    default: 'not submitted',
  },
    
   
}, { timestamps: true })


const salesRFQ = new mongoose.model("sales-rfq" , SalesRfqSchema)

module.exports =  salesRFQ