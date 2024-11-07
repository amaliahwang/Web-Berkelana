const { destinations, galleriesdestinations } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
	createDestination: async (req, res) => {
		try {
			const { name, description, price, location, locationMaps, categoryId } = req.body;

			if (!req.body || !req.file) {
				return res.status(400).json({
					success: false,
					message: 'Request body or file cannot be empty!',
				});
			}

			const facility = req.body.facility.split(',');

			const destination = await destinations.create({
				data: {
					name,
					thumbnail: `${process.env.APP_URL}/images/destination/${req.file.filename}`,
					description,
					price,
					location,
					locationMaps,
					facility,
					categoryId: parseInt(categoryId),
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Destination successfully created!',
				destination,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	getAllDestination: async (req, res) => {
		try {
			let filterOptions = {};

			if (req.query.price) {
				filterOptions.price = req.query.price;
			}
			if (req.query.category) {
				filterOptions.category = req.query.category;
			}
			if (req.query.name) {
				filterOptions.name = {
					contains: req.query.name,
					mode: 'insensitive',
				};
			}

			if (req.query.minPrice && req.query.maxPrice) {
				const minPrice = parseFloat(req.query.minPrice);
				const maxPrice = parseFloat(req.query.maxPrice);

				filterOptions.price = {
					gte: minPrice,
					lte: maxPrice,
				};
			}

			const data = await destinations.findMany({
				where: filterOptions,
				include: {
					gallery: true,
					category: true,
					wishlists: true,
				},
			});

			if (!data || data.length === 0) {
				return res.status(404).json({
					success: false,
					message: 'No destinations to display!',
				});
			}

			const destinationsWithFormattedPrice = data.map((destination) => {
				const formattedPrice = `Rp.${Number(destination.price).toLocaleString('id-ID')}`;
				return {
					id: destination.id,
					name: destination.name,
					thumbnail: destination.thumbnail,
					description: destination.description,
					price: formattedPrice,
					location: destination.location,
					locationMaps: destination.locationMaps,
					facility: destination.facility,
					category: destination.category.name,
					gallery: destination.gallery,
					wishlists: destination.wishlists,
				};
			});

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve all destinations!',
				destinations: destinationsWithFormattedPrice,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	getDestinationById: async (req, res) => {
		try {
			const { destinationId } = req.params;

			const data = await destinations.findFirst({
				include: {
					gallery: true,
					category: true,
					wishlists: true,
				},
				where: {
					id: parseInt(destinationId),
				},
			});

			if (!data) {
				return res.status(404).json({
					success: false,
					message: 'Destination not found!',
				});
			}

			const formattedPrice = `Rp.${Number(data.price).toLocaleString('id-ID')}`;

			const destination = {
				id: data.id,
				name: data.name,
				thumbnail: data.thumbnail,
				description: data.description,
				price: formattedPrice,
				location: data.location,
				locationMaps: data.locationMaps,
				facility: data.facility,
				category: data.category.name,
				gallery: data.gallery,
				wishlists: data.wishlists,
			};

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve destination!',
				destination: destination,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	updateDestination: async (req, res) => {
		try {
			const { destinationId } = req.params;
			const { name, description, price, location, locationMaps, categoryId } = req.body;
			let thumbnailPath = null;

			const destination = await destinations.findUnique({
				where: {
					id: parseInt(destinationId),
				},
			});

			const facility = req.body.facility.split(',');

			if (!destination) {
				return res.status(404).json({
					success: false,
					message: 'Destination not found!',
				});
			}

			if (req.file) {
				const oldThumbnailPath = destination.thumbnail.split('/').pop();
				fs.unlinkSync(path.join(__dirname, '../public/images/destination', oldThumbnailPath));

				thumbnailPath = `${process.env.APP_URL}/images/destination/${req.file.filename}`;
			}

			const updatedDestination = await destinations.update({
				where: {
					id: parseInt(destinationId),
				},
				data: {
					...(name && { name }),
					...(thumbnailPath && { thumbnail: thumbnailPath }),
					...(description && { description }),
					...(price && { price }),
					...(location && { location }),
					...(locationMaps && { locationMaps }),
					...(facility && { facility }),
					...(categoryId && { categoryId: parseInt(categoryId) }),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Destination updated successfully!',
				destination: updatedDestination,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	addGalleryDestination: async (req, res) => {
		try {
			const { destinationId } = req.params;

			if (!destinationId || !req.file) {
				return res.status(400).json({
					success: false,
					message: 'Destination ID or image file cannot be empty!',
				});
			}

			const gallery = await galleriesdestinations.create({
				data: {
					destinationId: parseInt(destinationId),
					image: `${process.env.APP_URL}/images/gallery_destination/${req.file.filename}`,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Gallery image successfully added!',
				gallery,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Failed to create gallery',
			});
		}
	},

	deleteGalleryDestinationById: async (req, res) => {
		try {
			const { galleryId } = req.params;

			const gallery = await galleriesdestinations.findUnique({
				where: {
					id: parseInt(galleryId),
				},
			});

			if (!gallery) {
				return res.status(404).json({
					success: false,
					message: 'Gallery image not found!',
				});
			}

			const imagePath = gallery.image.split('/').pop();
			fs.unlinkSync(path.join(__dirname, '../public/images/gallery_destination', imagePath));

			await galleriesdestinations.delete({
				where: {
					id: parseInt(galleryId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Gallery image deleted successfully!',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	deleteDestinationById: async (req, res) => {
		try {
			const { destinationId } = req.params;

			const destination = await destinations.findUnique({
				where: {
					id: parseInt(destinationId),
				},
				include: {
					gallery: true,
				},
			});

			if (!destination) {
				return res.status(404).json({
					success: false,
					message: 'Destination not found!',
				});
			}

			// Delete all gallery images associated with this destination
			if (destination.gallery && destination.gallery.length > 0) {
				for (const gallery of destination.gallery) {
					const imagePath = gallery.image.split('/').pop();
					try {
						fs.unlinkSync(path.join(__dirname, '../public/images/gallery_destination', imagePath));
					} catch (error) {
						console.error(`Error deleting image ${imagePath}:`, error);
					}
				}
			}

			try {
				const thumbnailPath = destination.thumbnail.split('/').pop();
				fs.unlinkSync(path.join(__dirname, '../public/images/destination', thumbnailPath));
			} catch (error) {
				console.error(`Error deleting thumbnail image:`, error);
			}

			await destinations.delete({
				where: {
					id: parseInt(destinationId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Destination and associated gallery images deleted successfully!',
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
