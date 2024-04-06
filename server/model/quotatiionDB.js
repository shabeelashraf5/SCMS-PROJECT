const mongoose = require('../config/config')


const SalesQuotationSchema = new mongoose.Schema({

    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    salesRFQ_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sales-rfq', required: true },
    
    to: {  type: String, required: true },
    attention: {  type: String, required: true },
    email: {  type: String, required: true },
    phone: {  type: String, required: true },
    clientrfq: {  type: String, required: true },

    clientPo: { type: String },
    date: {type: String },

     products: [
        {
            product: { type: String, required: true },
            qty: { type: Number, required: true },
            uom: { type: String, required: true },
            unit: { type: Number, required: true,  },
            uplift: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    subject: {  type: String, required: true },
    basis: {  type: String, required: true },
    payment: {  type: String, required: true },
    validity: {  type: String, required: true },
    availability: {  type: String, required: true },
    
     spo: {  type: String, required: true, unique: true  },

     status: {
        type: String,
        enum: ['not confirmed', 'Confirmed'],
        default: 'not confirmed',
      },
      
      totalAmount: { type: Number, required: true },
      discount: { type: Number, required: true },
      totalprice: { type: Number, required: true },
        
}, { timestamps: true })


const salesQuotation = new mongoose.model("quotation" , SalesQuotationSchema )

module.exports =  salesQuotation