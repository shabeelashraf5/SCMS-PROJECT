let express = require('express');
let router = express.Router();


const {verifyToken} = require('../token/tokenauth')


const purchaseController = require('../controller/purchaseController')


router.get('/supplier', verifyToken ,  purchaseController.loadSupplier)

router.get('/purchase-order', verifyToken ,  purchaseController.loadPo)
router.get('/purchase-order/:id', verifyToken,  purchaseController.purchaseSingle)

router.post('/purchase-order/form-add', verifyToken,  purchaseController.addPo)
router.put('/purchase-order/form-update/:id', verifyToken,  purchaseController.updatePo)

router.get('/purchase-order/form-add/:po_id', verifyToken,   purchaseController.fetchPo)

router.get('/purchase-history', verifyToken ,  purchaseController.loadPurchaseDetails)

router.post('/purchase-order/confirm', verifyToken ,  purchaseController.addInvoice)





module.exports = router;