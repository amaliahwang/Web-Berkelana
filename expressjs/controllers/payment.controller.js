const { payments, profiles } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	createPayment: async (req, res) => {
		try {
			const generateReferenceId = () => {
				const randomStr = Math.random().toString(36).substring(7).toUpperCase();
				return `BERKELANA-${randomStr}`;
			};
			const userId = req.user.id;
			const { destinationId, packageId, paymentMethodId, amount, goingAt } = req.body;

			const userProfile = await profiles.findFirst({ where: { userId } });

			if (!userProfile) {
				return res.status(404).json({
					success: false,
					message: 'User profile not found',
				});
			}

			const referenceId = generateReferenceId();
			const expiredAt = new Date(goingAt);
			expiredAt.setDate(expiredAt.getDate() + 1);

			const payment = await payments.create({
				data: {
					referenceId,
					userId: parseInt(userId),
					destinationId: parseInt(destinationId),
					packageId: parseInt(packageId),
					paymentMethodId: parseInt(paymentMethodId),
					name: userProfile.name,
					email: req.user.email,
					phoneNumber: userProfile.phoneNumber,
					amount,
					paymentProof: `${process.env.APP_URL}/images/payment_proof/${req.file.filename}`,
					statusPayment: 'review',
					goingAt: new Date(goingAt),
					expiredAt,
				},
			});

			return res.status(201).json({
				success: true,
				message: 'Your payment has been successfully recorded in the system!',
				payment,
			});
		} catch (error) {
			console.error('Error creating payment:', error);
			res.status(500).json({
				success: false,
				message: 'Failed to create payment',
			});
		}
	},

	getUserPaymentHistory: async (req, res) => {
		try {
			const userId = req.user.id;
			const { destinationId, packageId } = req.params;

			let whereCondition = { userId };
			if (destinationId) whereCondition.destinationId = parseInt(destinationId);
			if (packageId) whereCondition.packageId = parseInt(packageId);

			const userPayments = await payments.findMany({ where: whereCondition });

			res.status(200).json({
				success: true,
				payments: userPayments,
			});
		} catch (error) {
			console.error('Error fetching user payment history:', error);
			res.status(500).json({
				success: false,
				message: 'Failed to fetch user payment history',
			});
		}
	},

	getAllUserPaymentHistory: async (req, res) => {
		try {
			const userId = req.user.id;

			const getHistory = await payments.findMany({
				where: {
					userId: parseInt(userId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Success to retrieve all payment history data!',
				paymentHistory: getHistory,
			});
		} catch (error) {
			console.log(`Error when fetch user payment history: ${error}`);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},

	// admin can changes status payment
	confirmPaymentHistory: async (req, res) => {
		try {
			const { paymentId } = req.params;
			const { statusPayment } = req.body;

			const validStatus = ['unpaid', 'review', 'paid'];
			if (!validStatus.includes(statusPayment)) {
				return res.status(400).json({ error: 'Invalid payment status' });
			}

			const getPayment = await payments.findUnique({
				where: {
					id: parseInt(paymentId),
				},
			});

			if (!getPayment) {
				return res.status(404).json({
					success: false,
					message: 'Payment with that ID was not found',
				});
			}

			const updatedPayment = await payments.update({
				where: {
					id: parseInt(paymentId),
				},
				data: { statusPayment },
			});

			return res.status(200).json({
				success: true,
				message: 'Success to update user status payment',
				updatedPayment,
			});
		} catch (error) {
			console.log(`Error when updating user status payment: ${error}`);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},
};
