const { users, profiles } = require('../models');
const utils = require('../utilities');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret_key = process.env.JWT_KEY;
const generateToken = require('../middlewares/generateToken');
const mailResetPassword = require('../mailers/sendLinkResetPassword');

module.exports = {
	register: async (req, res) => {
		try {
			const existingEmail = await users.findFirst({
				where: {
					email: req.body.email,
				},
			});

			if (existingEmail) {
				return res.status(400).json({
					success: false,
					message: 'Email already exists!',
				});
			}

			const existingUsername = await users.findFirst({
				where: {
					username: req.body.username,
				},
			});

			if (existingUsername) {
				return res.status(400).json({
					success: false,
					message: 'Username already exists!',
				});
			}

			const hashedPassword = await utils.cryptPassword(req.body.password);

			const registerUser = await users.create({
				data: {
					username: req.body.username,
					email: req.body.email,
					password: hashedPassword,
					role: req.body.role,
					registeredAt: new Date(),
				},
			});

			const userProfile = await profiles.create({
				data: {
					userId: registerUser.id,
				},
			});

			return res.status(201).json({
				user: registerUser,
				profile: userProfile,
				message: 'Congratulations! Your account was successfully registered.',
			});
		} catch (error) {
			console.error('Error during registration:', error);
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},

	login: async (req, res) => {
		try {
			const { identifier, password } = req.body;

			if (!identifier || !password) {
				return res.status(400).json({
					success: false,
					message: 'Please provide both email/username and password.',
				});
			}

			let findUser;
			if (identifier.includes('@')) {
				findUser = await users.findUnique({
					where: {
						email: identifier,
					},
				});
			} else {
				findUser = await users.findUnique({
					where: {
						username: identifier,
					},
				});
			}

			if (!findUser) {
				return res.status(404).json({
					success: false,
					message: 'Oopss! Your username or email is not registered in our system.',
				});
			}

			if (bcrypt.compareSync(req.body.password, findUser.password)) {
				const token = generateToken(findUser);

				return res.status(200).json({
					data: {
						token,
						user: findUser,
					},
				});
			}

			res.status(403).json({
				success: false,
				message: 'Invalid Credentials',
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},

	resetPassword: async (req, res) => {
		try {
			const findUser = await users.findFirst({
				where: {
					email: req.body.email,
				},
			});

			if (!findUser) {
				return res.status(404).json({
					success: false,
					message: 'Oopss! Your email is not registered in our system.',
				});
			}

			const resetPasswordToken = await utils.cryptPassword(req.body.email);

			await users.update({
				data: {
					resetPasswordToken,
				},
				where: {
					id: findUser.id,
				},
			});

			await mailResetPassword.sendResetPasswordEmail(req.body.email, resetPasswordToken);

			return res.status(200).json({
				success: true,
				message: 'Password reset link was sent to your email!',
				email: req.body.email,
				resetPasswordToken,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: 'An error occurred!',
			});
		}
	},

	setPassword: async (req, res) => {
		try {
			const { resetPasswordToken } = req.query;
			const { newPassword, confirmPassword } = req.body;

			if (newPassword !== confirmPassword) {
				return res.status(400).json({
					success: false,
					message: 'Password and confirmation do not match.',
				});
			}

			const findUser = await users.findFirst({
				where: {
					resetPasswordToken,
				},
			});

			if (!findUser) {
				return res.status(400).json({
					success: false,
					message: 'Invalid or expired reset password token!',
				});
			}

			const hashedPassword = await utils.cryptPassword(newPassword);

			await users.update({
				data: {
					password: hashedPassword,
					resetPasswordToken: null,
				},
				where: {
					id: findUser.id,
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Password reset was successfully!',
			});
		} catch (error) {
			console.error('Error details:', error);
			return res.status(500).json({
				error: true,
				message: 'An error occurred',
			});
		}
	},
};
