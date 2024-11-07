const express = require('express'),
	router = express.Router(),
	authRouter = require('./auth.router.js'),
	profileRouter = require('./profile.router.js'),
	categoryDestinationRouter = require('./categoryDestination.router.js'),
	destinationRouter = require('./destination.router.js'),
	destinationPackageRouter = require('./destinationPackage.router.js'),
	wishListRouter = require('./wishList.router.js'),
	promoRouter = require('./promo.router.js'),
	paymentRouter = require('./payment.router.js'),
	paymentMethodRouter = require('./paymentMethod.router.js'),
	subscriptionRouter = require('./subscription.router.js');

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/category-destination', categoryDestinationRouter);
router.use('/subscription', subscriptionRouter);
router.use('/destination', destinationRouter);
router.use('/destination-package', destinationPackageRouter);
router.use('/wish-list', wishListRouter);
router.use('/promo', promoRouter);
router.use('/payment-method', paymentMethodRouter);
router.use('/payment', paymentRouter);

module.exports = router;
