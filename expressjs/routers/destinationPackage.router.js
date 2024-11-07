const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	destinationpackageController = require('../controllers/destinationPackage.controller'),
	{ authenticateUser, checkLevel } = require('../middlewares/authentication');

router.post('/', authenticateUser, checkLevel, multer.thumbnailDestinationPackage.single('thumbnail'), destinationpackageController.createDestinationPackage);
router.get('/', destinationpackageController.getAllDestinationPackages);
router.get('/:packageId', destinationpackageController.getDestinationPackageById);
router.put('/:packageId', authenticateUser, checkLevel, multer.thumbnailDestinationPackage.single('thumbnail'), destinationpackageController.updateDestinationPackageById);
router.delete('/:packageId', authenticateUser, checkLevel, destinationpackageController.deleteDestinationPackageById);

router.post('/:packageId/add-gallery', authenticateUser, checkLevel, multer.galleryPackageDestination.single('image'), destinationpackageController.addGalleryPackage);
router.delete('/:packageId/delete-gallery/:galleryId', authenticateUser, checkLevel, destinationpackageController.deleteGalleryPackage);

module.exports = router;
