const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log('Database is Connected')
})
.catch(()=>{
  console.log('Database Failed to Connect')
})

module.exports = mongoose;