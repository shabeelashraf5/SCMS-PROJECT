const mongoose = require('../config/config')

const addAdminSchema = new mongoose.Schema({
    
    fname: { type: String, trim: true, },
    lname: { type: String, trim: true, },
    email: { type: String, trim: true,  unique: true },
    password: { type: String, },
  });

  const collectionadmin = new mongoose.model("admin" , addAdminSchema)

  module.exports =  collectionadmin