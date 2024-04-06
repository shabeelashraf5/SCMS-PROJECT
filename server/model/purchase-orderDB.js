const mongoose = require('../config/config')

const PurchaseOrderSchema = new mongoose.Schema({

    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    po_id: { type: mongoose.Schema.Types.ObjectId, ref: 'purchase-po', required: true },
    
    to: {  type: String, required: true },
    attention: {  type: String, required: true },
    email: {  type: String, required: true },
    phone: {  type: String, required: true },
    supplierrfq: {  type: String, required: true },
    

    products: [
        {
            product: { type: String, required: true },
            qty: { type: Number, required: true },
            uom: { type: String, required: true },
            unit: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    
    subject: {  type: String, required: true },
    basis: {  type: String, required: true },
    payment: {  type: String, required: true },
    validity: {  type: String, required: true },
    availability: {  type: String, required: true },
    totalAmount: { type: Number, required: true },

    status: {
        type: String,
        enum: ['not confirmed', 'Confirmed'],
        default: 'Not confirmed',
      },
    
        
}, { timestamps: true })


const purchaseOrder = new mongoose.model("purchase-order" , PurchaseOrderSchema )

module.exports =  purchaseOrder