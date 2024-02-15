const mongoose = require('../config/config')

const CategorySchema = new mongoose.Schema({

    category: {type: String, required: true, unique: true} ,


})

const collectionadcategory = new mongoose.model("ad-category" , CategorySchema)

module.exports =  collectionadcategory 