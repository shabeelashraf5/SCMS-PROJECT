let express = require('express');
let router = express.Router();



const warehouseController = require('../controller/warehouseController')



router.get('/inventory-list', warehouseController.loadInventory)








module.exports = router;