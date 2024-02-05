let express = require('express');
let router = express.Router();

const collectionadmin = require('../model/adminDS')



router.get('/' , (req,res) =>{

    res.send('Hello Server , You are welcome')
})













module.exports = router;
