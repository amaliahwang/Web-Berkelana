const { categoriesdestination } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
	createCategoryDestination: async (req, res) => {
		try {
			if (Object.keys(req.body).length === 0 || !req.file) {
				return res.status(400).json({
					success: false,
					message: 'Name of category destination cannot be empty!',
				});
			}

			const categoryDestination = await categoriesdestination.create({
				data: {
					name: req.body.name,
					thumbnail: `${process.env.APP_URL}/images/category_destination/${req.file.filename}`,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Category destination created successfully',
				categoryDestination,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
				error: error.message,
			});
		}
	},

	getAllCategoryDestination: async (req, res) => {
		try {
			const data = await categoriesdestination.findMany();

			if (!data || data.length === 0) {
				return res.status(404).json({
					success: false,
					message: 'Categories destination not found!',
				});
			}

			return res.status(200).json({
				success: true,
				categoryDestinations: data,
			});
		} catch (error) {
			console.log('Error when fetch category destinations:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	getCategoryDestinationById: async (req, res) => {
		const getById = await categoriesdestination.findFirst({
			where: {
				id: parseInt(req.params.id),
			},
		});

		if (getById) {
			return res.status(200).json({
				success: true,
				data: getById,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: 'Category destination not found!',
			});
		}
	},

	deleteCategoryDestination: async (req, res) => {
		try {
			const id = req.query.id;

			if (!id) {
				return res.status(400).json({
					success: false,
					message: 'Missing id parameter in the request query',
				});
			}

			const findId = await categoriesdestination.findFirst({
				where: {
					id: parseInt(id),
				},
			});

			if (!findId) {
				return res.status(404).json({
					success: false,
					message: 'Category destination for this id not found!',
				});
			}

			if (findId.thumbnail) {
				const filename = path.basename(findId.thumbnail);
				const imagePath = path.join(__dirname, '../', 'public', 'images', 'category_destination', filename);

				await fs.unlink(imagePath, (err) => {
					if (err) {
						throw err;
					}
				});
			}

			await categoriesdestination.delete({
				where: {
					id: parseInt(id),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Success to delete category destination!',
			});
		} catch (error) {
			console.log('Error while delete category destination:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},
};
