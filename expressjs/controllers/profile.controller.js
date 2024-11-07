const { users, profiles } = require('../models');
const utils = require('../utilities');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
	getMyProfile: async (req, res) => {
		try {
			const user_id = req.user.id;

			const userProfile = await profiles.findFirst({
				where: {
					userId: user_id,
				},
				include: {
					user: true,
				},
			});

			if (!userProfile) {
				return res.status(404).json({
					success: false,
					message: 'User not found!',
				});
			}

			return res.status(200).json(userProfile);
		} catch (error) {
			console.error('Error fetching user profile:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},

	updateMyProfile: async (req, res) => {
		const user_id = req.user.id;

		try {
			let updatedData = {};

			if (req.body.name) {
				updatedData.name = req.body.name;
			}

			if (req.body.phoneNumber) {
				updatedData.phoneNumber = req.body.phoneNumber;
			}

			if (req.body.address) {
				updatedData.address = req.body.address;
			}

			if (Object.keys(updatedData).length === 0) {
				return res.json({
					success: true,
					message: 'No changes provided for update.',
				});
			}

			const updatedProfile = await profiles.update({
				where: {
					userId: user_id,
				},
				data: updatedData,
			});

			return res.status(200).json(updatedProfile);
		} catch (error) {
			console.error('Error updating user profile:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},

	updatePassword: async (req, res) => {
		const user_id = req.user.id;
		const { currentPassword, newPassword } = req.body;

		try {
			const user = await users.findUnique({
				where: {
					id: user_id,
				},
			});

			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User not found!',
				});
			}

			const passwordMatch = await bcrypt.compare(currentPassword, user.password);

			if (!passwordMatch) {
				return res.status(400).json({
					success: false,
					message: 'Current password is incorrect!',
				});
			}

			const hashedNewPassword = await utils.cryptPassword(newPassword);

			await users.update({
				where: {
					id: user_id,
				},
				data: {
					password: hashedNewPassword,
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Password updated successfully!',
			});
		} catch (error) {
			console.error('Error updating user password:', error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},
};
