const { promos } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
	getAllPromo: async (req, res) => {
		try {
			const allPromo = await promos.findMany();

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve all promo!',
				promotions: allPromo,
			});
		} catch (error) {
			console.error('Error fetching promos:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	createPromo: async (req, res) => {
		const { name, code, discountPercentage, validFrom, validTo } = req.body;
		try {
			const newPromo = await promos.create({
				data: {
					name,
					thumbnail: `${process.env.APP_URL}/images/promo/${req.file.filename}`,
					code,
					discountPercentage: parseInt(discountPercentage),
					validFrom,
					validTo,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Promo created successfully',
				promo: newPromo,
			});
		} catch (error) {
			console.error('Error creating promo:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	updatePromo: async (req, res) => {
		const { promoId } = req.params;
		const { code, discountPercentage, validFrom, validTo } = req.body;
		try {
			const updatedPromo = await promos.update({
				where: {
					id: parseInt(promoId),
				},
				data: {
					code,
					discountPercentage: parseInt(discountPercentage),
					validFrom,
					validTo,
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Promo updated successfully',
				promo: updatedPromo,
			});
		} catch (error) {
			console.error('Error updating promo:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	deletePromo: async (req, res) => {
		const { promoId } = req.params;
		try {
			await promos.delete({
				where: {
					id: parseInt(promoId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Promo deleted successfully',
			});
		} catch (error) {
			console.error('Error deleting promo:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},
};
