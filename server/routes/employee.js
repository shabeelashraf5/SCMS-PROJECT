let express = require('express');
let router = express.Router();

const employeeController = require('../controller/employeeController')
const {verifyToken} = require('../token/tokenauth')


router.post('/dashboard', employeeController.employeeLogin )

router.get('/dashboard', employeeController.loadMessage)
router.post('/dashboard/add', verifyToken, employeeController.addMessage);
router.delete('/dashboard/delete/:id' , verifyToken, employeeController.deleteMessage)

router.get('/reset-password', employeeController.displayResetPasswordPage)
router.put('/reset-password', employeeController.resetPassword);



router.get('/profile', verifyToken ,  employeeController.loadProfileEmployee)

router.get('/video-conference', verifyToken ,  employeeController.loadEmVideo)

router.get('/messenger', verifyToken ,  employeeController.loadChatUser)

router.post('/save-chat', verifyToken, employeeController.saveChat);

router.get('/messages/:senderId/:receiverId', verifyToken ,  employeeController.loadChat)

router.post('/refresh-token', employeeController.refreshToken);

router.put('/logout',  employeeController.EmployeeLogOut)

router.put('/mark-as-seen', verifyToken, employeeController.markMessageAsSeen);

// router.get('/news', employeeController.getNews);




module.exports = router;