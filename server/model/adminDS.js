const mongoose = require('../config/config')

const addAdminSchema = new mongoose.Schema({
    
    fname: { type: String, trim: true, required: true },
    lname: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, required: true },
  });

  const collectionadmin = new mongoose.model("admin" , addAdminSchema)

  module.exports =  collectionadmin