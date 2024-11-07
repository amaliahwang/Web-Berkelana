const { paymentMethods } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
	getAllPaymentMethod: async (req, res) => {
		try {
			const allMethod = await paymentMethods.findMany();

			if (allMethod.length === 0) {
				return res.status(404).json({
					success: false,
					message: 'Payments method data not found',
				});
			}

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve all payment Method!',
				promotions: allMethod,
			});
		} catch (error) {
			console.error('Error fetching promos:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	createNewPaymentMethod: async (req, res) => {
		const { name, accountName, accountNumber } = req.body;
		try {
			const newMethod = await paymentMethods.create({
				data: {
					name,
					thumbnail: `${process.env.APP_URL}/images/thumbnail_payment_methods/${req.file.filename}`,
					accountName,
					accountNumber: accountNumber,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'A payment method created successfully',
				promo: newMethod,
			});
		} catch (error) {
			console.error('Error creating promo:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	updatePaymentMethod: async (req, res) => {
		const { paymentMethodId } = req.params;
		const { name, accountName, accountNumber } = req.body;
		try {
			const existingMethod = await paymentMethods.findFirst({
				where: {
					id: parseInt(paymentMethodId),
				},
			});

			if (!existingMethod) {
				return res.status(404).json({
					success: false,
					message: 'Payment method not found',
				});
			}

			// Membuat objek data yang akan di-update
			const updatedData = {};
			if (name) {
				updatedData.name = name;
			}
			if (accountName) {
				updatedData.accountName = accountName;
			}
			if (accountNumber) {
				updatedData.accountNumber = accountNumber;
			}

			// Melakukan update hanya pada data yang terdefinisi
			const updatedMethod = await paymentMethods.update({
				where: {
					id: parseInt(paymentMethodId),
				},
				data: updatedData,
			});

			return res.status(200).json({
				success: true,
				message: 'Payment method updated successfully',
				method: updatedMethod,
			});
		} catch (error) {
			console.error('Error updating payment method:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	deletePaymentMethod: async (req, res) => {
		const { paymentMethodId } = req.params;
		try {
			const existingMethod = await paymentMethods.findFirst({
				where: {
					id: parseInt(paymentMethodId),
				},
			});

			if (!existingMethod) {
				return res.status(404).json({
					success: false,
					message: 'Payment method not found',
				});
			}

			await paymentMethods.delete({
				where: {
					id: parseInt(paymentMethodId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Payment method deleted successfully',
			});
		} catch (error) {
			console.error('Error deleting payment method:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},
};
