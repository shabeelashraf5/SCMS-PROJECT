let express = require('express');
let router = express.Router();


const shipmentController = require('../controller/shipmentController')
const {verifyToken} = require('../token/tokenauth')



router.get('/shipment-history', verifyToken , shipmentController.loadInv)
router.put('/:id/update-status', verifyToken , shipmentController.changeStatus)





module.exports = router;