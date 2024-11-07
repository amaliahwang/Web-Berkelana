const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	paymentMethodController = require('../controllers/paymentMethod.controller'),
	{ authenticateUser, checkLevel } = require('../middlewares/authentication');

router.get('/', paymentMethodController.getAllPaymentMethod);
router.post('/', authenticateUser, checkLevel, multer.thumbnailPaymentMethod.single('thumbnail'), paymentMethodController.createNewPaymentMethod);
router.put('/:paymentMethodId', authenticateUser, checkLevel, paymentMethodController.updatePaymentMethod);
router.delete('/:paymentMethodId', authenticateUser, checkLevel, paymentMethodController.deletePaymentMethod);

module.exports = router;
