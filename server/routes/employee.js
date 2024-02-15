let express = require('express');
let router = express.Router();

const employeeController = require('../controller/employeeController')



router.post('/dashboard', employeeController.employeeLogin )









module.exports = router;