const mongoose = require('../config/config')

const NewsSchema = new mongoose.Schema({

    article: {type: String, required: true } ,
},
{ timestamps: true })



const collectionnews = new mongoose.model("ad-news" , NewsSchema)

module.exports =  collectionnews 