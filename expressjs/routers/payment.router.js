const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	paymentController = require('../controllers/payment.controller'),
	{ authenticateUser, checkLevel } = require('../middlewares/authentication');

router.post('/', authenticateUser, multer.paymentProofImage.single('thumbnail'), paymentController.createPayment);
router.get('/history', authenticateUser, paymentController.getAllUserPaymentHistory);
router.get('/history/:destinationId?/:packageId?', authenticateUser, paymentController.getUserPaymentHistory);
router.put('/review/:paymentId', authenticateUser, checkLevel, paymentController.confirmPaymentHistory);

module.exports = router;
