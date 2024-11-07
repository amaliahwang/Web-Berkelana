const { subscriptions } = require('../models');
const mailSubscription = require('../mailers/sendSubscriptions');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	sendSubscription: async (req, res) => {
		try {
			const { email } = req.body;

			const existingSubscription = await subscriptions.findUnique({
				where: {
					email: email,
				},
			});

			if (existingSubscription) {
				return res.status(400).json({
					success: false,
					message: 'Email already exists in subscriptions!',
				});
			} else {
				await mailSubscription.sendSubscriptionMail(email);

				await subscriptions.create({
					data: {
						email: email,
						subscribedAt: new Date(),
					},
				});

				return res.status(200).json({
					success: true,
					message: `Subscription email has been sent to ${email}!`,
				});
			}
		} catch (error) {
			console.error('Error in sendSubscription:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},
};
