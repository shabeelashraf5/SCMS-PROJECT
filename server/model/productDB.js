const mongoose = require('../config/config')

const ProductSchema = new mongoose.Schema({
    
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ad-category',
        required: true
    },
    product: {type: String, required: true } ,
    description: {type: String, required: true },
    uom: {type:String, required: true},
    price: {type: Number, required: true } ,
    availability: {type: String, required: true }
}, { timestamps: true })



const collectionproduct=new mongoose.model("product" , ProductSchema)

module.exports =  collectionproduct