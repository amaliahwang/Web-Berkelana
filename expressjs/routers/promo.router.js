const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	promoController = require('../controllers/promo.controller'),
	{ authenticateUser, checkLevel } = require('../middlewares/authentication');

router.get('/', promoController.getAllPromo);
router.post('/', authenticateUser, checkLevel, multer.thumbnailPromo.single('thumbnail'), promoController.createPromo);
router.put('/:promoId', authenticateUser, checkLevel, multer.thumbnailPromo.single('thumbnail'), promoController.updatePromo);
router.delete('/:promoId', authenticateUser, checkLevel, promoController.deletePromo);

module.exports = router;
