const { destinationPackage, galleriesPackage } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
	createDestinationPackage: async (req, res) => {
		try {
			const { name, price, facility, extraBenefits, destinations } = req.body;

			// validate data destinations
			if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
				return res.status(400).json({
					success: false,
					message: 'Destinations data is missing or invalid!',
				});
			}

			// Parsing data destinations
			const parsedDestinations = destinations.map((dest) => ({
				destinationId: parseInt(dest.destinationId),
				destinationOrder: parseInt(dest.destinationOrder),
			}));

			const createdPackage = await destinationPackage.create({
				data: {
					name,
					price,
					facility,
					thumbnail: `${process.env.APP_URL}/images/destination_package/${req.file.filename}`,
					extraBenefits,
					destinations: {
						createMany: {
							data: parsedDestinations,
						},
					},
				},
				include: {
					destinations: true,
					gallery: true,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Destination package successfully created!',
				package: createdPackage,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	getAllDestinationPackages: async (req, res) => {
		try {
			const packages = await destinationPackage.findMany({
				include: {
					destinations: true,
					gallery: true,
				},
			});

			if (packages.length === 0) {
				return res.status(404).json({
					success: false,
					message: 'Destination packages not found!',
				});
			}

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve all destination packages!',
				packages: packages,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	getDestinationPackageById: async (req, res) => {
		try {
			const { packageId } = req.params;

			const package = await destinationPackage.findUnique({
				where: {
					id: parseInt(packageId),
				},
				include: {
					destinations: {
						include: {
							destination: true,
						},
					},
					gallery: true,
				},
			});

			if (!package) {
				return res.status(404).json({
					success: false,
					message: 'Destination package not found!',
				});
			}

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve destination package!',
				package: package,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	updateDestinationPackageById: async (req, res) => {
		try {
			const { packageId } = req.params;

			const existingPackage = await destinationPackage.findUnique({
				where: {
					id: parseInt(packageId),
				},
			});

			if (!existingPackage) {
				return res.status(404).json({
					success: false,
					message: 'Destination package not found!',
				});
			}

			const newData = {};

			if (req.body.name) {
				newData.name = req.body.name;
			}

			if (req.body.price) {
				newData.price = req.body.price;
			}

			if (req.body.extraBenefits) {
				newData.extraBenefits = req.body.extraBenefits.split(',');
			}

			if (req.body.facility) {
				newData.facility = req.body.facility.split(',');
			}

			if (req.body.destinations) {
				newData.destinations = {
					deleteMany: {},
					createMany: {
						data: req.body.destinations.map((dest) => ({
							destinationId: parseInt(dest.destinationId),
							destinationOrder: parseInt(dest.destinationOrder),
						})),
					},
				};
			}

			let thumbnailPath = null;
			if (req.file) {
				if (existingPackage.thumbnail) {
					const oldThumbnailPath = existingPackage.thumbnail.split('/').pop();
					fs.unlinkSync(path.join(__dirname, '../public/images/destination_package', oldThumbnailPath));
				}

				thumbnailPath = `${process.env.APP_URL}/images/destination_package/${req.file.filename}`;
				newData.thumbnail = thumbnailPath;
			}

			const updatedPackage = await destinationPackage.update({
				where: {
					id: parseInt(packageId),
				},
				data: newData,
				include: {
					destinations: true,
					gallery: true,
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Destination updated successfully!',
				package: updatedPackage,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	deleteDestinationPackageById: async (req, res) => {
		try {
			const { packageId } = req.params;

			const packageDest = await destinationPackage.findUnique({
				where: {
					id: parseInt(packageId),
				},
				include: {
					gallery: true,
				},
			});

			if (!packageDest) {
				return res.status(404).json({
					success: false,
					message: 'Destination package not found!',
				});
			}

			// Delete all gallery images associated with this destination
			if (packageDest.gallery && packageDest.gallery.length > 0) {
				for (const gallery of packageDest.gallery) {
					const imagePath = gallery.image.split('/').pop();
					try {
						fs.unlink(path.join(__dirname, '../public/images/gallery_package', imagePath), (err) => {
							if (err) {
								console.error(`Error deleting image ${imagePath}:`, err);
							}
						});
					} catch (error) {
						console.error(`Error deleting image ${imagePath}:`, error);
					}
				}
			}

			// Delete thumbnail image of the destination
			if (packageDest.thumbnail) {
				const thumbnailPath = packageDest.thumbnail.split('/').pop();
				try {
					fs.unlink(path.join(__dirname, '../public/images/destination_package', thumbnailPath), (err) => {
						if (err) {
							console.error(`Error deleting thumbnail image ${thumbnailPath}:`, err);
						}
					});
				} catch (error) {
					console.error(`Error deleting thumbnail image ${thumbnailPath}:`, error);
				}
			}

			await destinationPackage.delete({
				where: {
					id: parseInt(packageId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Destination package and associated gallery images deleted successfully!',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	addGalleryPackage: async (req, res) => {
		try {
			const { packageId } = req.params;

			if (!packageId || !req.file) {
				return res.status(400).json({
					success: false,
					message: 'Destination ID or image file cannot be empty!',
				});
			}

			const findPackage = await destinationPackage.findUnique({
				where: {
					id: parseInt(packageId),
				},
			});

			if (!findPackage) {
				return res.status(404).json({
					success: false,
					message: 'Destination package not found!',
				});
			}

			const gallery = await galleriesPackage.create({
				data: {
					packageId: parseInt(packageId),
					image: `${process.env.APP_URL}/images/gallery_package/${req.file.filename}`,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Gallery package successfully added!',
				data: gallery,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Failed to create gallery',
			});
		}
	},

	deleteGalleryPackage: async (req, res) => {
		try {
			const { galleryId } = req.params;

			const gallery = await galleriesPackage.findUnique({
				where: {
					id: parseInt(galleryId),
				},
			});

			if (!gallery) {
				return res.status(404).json({
					success: false,
					message: 'Gallery package not found!',
				});
			}

			const imagePath = gallery.image.split('/').pop();
			fs.unlinkSync(path.join(__dirname, '../public/images/gallery_package', imagePath));

			await galleriesPackage.delete({
				where: {
					id: parseInt(galleryId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Gallery package deleted successfully!',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},
};
