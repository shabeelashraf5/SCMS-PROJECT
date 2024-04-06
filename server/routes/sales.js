let express = require('express');
let router = express.Router();


const salesController = require('../controller/salesController')
const {verifyToken, checkRole} = require('../token/tokenauth')



router.get('/customer', verifyToken ,  salesController.loadClient)

router.get('/quotations',  verifyToken , salesController.loadRfq)
router.post('/quotations/add', verifyToken ,  salesController.addRfq)
router.get('/quotations/:id', verifyToken,  salesController.quotationSingle)

router.post('/quotations/form-add', verifyToken,  salesController.addQuotation)
router.put('/quotations/form-update/:id', verifyToken, salesController.updateQuotation)

router.get('/quotations/form-add/:salesRFQ_id', verifyToken,  salesController.fetchSrfq)

router.get('/sales-order', verifyToken ,  salesController.loadSalesOrder)
router.get('/sales-order/:id', verifyToken ,  salesController.ClientPoSingle)
//router.post('/sales-order/add', verifyToken ,  salesController.addClientPo)

router.post('/sales-order/form-add', verifyToken,  salesController.addClientPo)
router.put('/sales-order/form-update/:id', verifyToken, salesController.updateClientPo)

router.get('/sales-order/form-add/:quotation_id', verifyToken,  salesController.fetchQuotationId)

router.get('/sales-analysis', verifyToken ,  salesController.loadSalesAnalysis)

router.post('/sales-order/confirm', verifyToken ,  salesController.addPo)



module.exports = router;