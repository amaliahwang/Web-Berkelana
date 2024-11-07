const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_KEY || 'secret';

const generateToken = (userData) => {
	const payload = {
		id: userData.id,
		username: userData.username,
		role: userData.role,
		email: userData.email,
		registeredAt: userData.registeredAt,
	};

	return jwt.sign(payload, secret_key, { expiresIn: '1h' });
};

module.exports = generateToken;
