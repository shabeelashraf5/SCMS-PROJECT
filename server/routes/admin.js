let express = require('express');
let router = express.Router();

const adminController = require('../controller/adminController')
const upload = require('../fileUpload/fileConfig')


router.post('/portal', adminController.adminLogin )

router.get('/admin-user', adminController.loadAdmin )
router.post('/admin-user/add' , adminController.addAdmin)
router.put('/admin-user/update/:id' , adminController.updateAdmin)
router.delete('/admin-user/delete/:id' , adminController.deleteAdmin)

router.get('/employee', adminController.loadEmployee)
router.post('/employee/add', adminController.addEmployee);
router.put('/employee/update/:id' , adminController.updateEmployee)
router.delete('/employee/delete/:id' , adminController.deleteEmployee)


router.get('/category', adminController.loadCategory)
router.post('/category/add', adminController.addCategory);
router.put('/category/update/:id' , adminController.updateCategory)
router.delete('/category/delete/:id' , adminController.deleteCategory)

router.get('/product', adminController.loadProduct)
router.post('/product/add', adminController.addProduct);


module.exports = router;
