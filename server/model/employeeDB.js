const mongoose = require('../config/config')

  const addEmployeeSchema = new mongoose.Schema({
      
      fname: { type: String, trim: true, required: true },
      lname: { type: String, trim: true, required: true },
      email: { type: String, trim: true, required: true, unique: true },
      password: { type: String, required: true },
      position: { type: String, required: true },
      area: { type: String, required: true },
      department: { type: String, required: true },
    // image: { type: String, required: true },
      
    });

    const collectionemployee = new mongoose.model("employee" , addEmployeeSchema)

    module.exports =  collectionemployee