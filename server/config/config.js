const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(`mongodb+srv://shabeelash5:wGzEMe0qZvBVAgN6@cluster0.kfyrp1e.mongodb.net/scms-project?retryWrites=true&w=majority`)
.then(()=>{
  console.log('Database is Connected')
})
.catch(()=>{
  console.log('Database Failed to Connect')
})

module.exports = mongoose;