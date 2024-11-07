const express = require('express'),
	router = express.Router(),
	wishlistController = require('../controllers/wishList.controller'),
	{ authenticateUser } = require('../middlewares/authentication');

router.get('/', authenticateUser, wishlistController.getWishList);
router.post('/', authenticateUser, wishlistController.addToWishList);
router.delete('/:destinationId', authenticateUser, wishlistController.removeFromWishList);

module.exports = router;
