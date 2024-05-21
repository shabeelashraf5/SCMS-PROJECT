let express = require('express');
let router = express.Router();


const accountingController = require('../controller/accountingController')
const {verifyToken, checkRole} = require('../token/tokenauth')


router.get('/invoicing', verifyToken , checkRole , accountingController.loadInv)
router.get('/invoicing/:id', verifyToken ,  accountingController.invoiceSingle)
router.post('/invoicing/confirm', verifyToken ,  accountingController.addshipment)

router.get('/financial-transaction', verifyToken , checkRole ,   accountingController.loadTrans)
router.get('/financial-transaction/:id', verifyToken ,  accountingController.transSingle)
//router.post('/financial-transaction/payment/create-checkout-session', verifyToken ,  accountingController.createPaymentSession)

router.post('/financial-transaction/payment',  accountingController.paymentSup)

router.post('/financial-transaction/payment/create-checkout-session',  accountingController.createPaymentSession)


router.put('/:id/pay', verifyToken , accountingController.confirmPayment)

router.post('/webhook/stripe', accountingController.stripeWebHook)

router.get('/financial-reports', verifyToken , checkRole , accountingController.loadReport)



module.exports = router;