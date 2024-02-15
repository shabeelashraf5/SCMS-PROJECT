const mongoose = require('../config/config')

const ProductSchema = new mongoose.Schema({
    
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    product: {type: String, required: true } ,
    description: {type: Number, required: true },
    uom: {type:String, required: true},
    price: {type: String, required: true } ,
    availability: {type: Number, required: true }
})



const collectionproduct=new mongoose.model("product" , ProductSchema)

module.exports =  collectionproduct