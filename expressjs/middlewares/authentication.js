const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_KEY || 'secret';

const authenticateUser = async (req, res, next) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(403).json({
			success: false,
			message: 'Please provide a token!',
		});
	}

	if (token.toLowerCase().startsWith('bearer')) {
		token = token.slice('bearer'.length).trim();
	}

	try {
		const jwtPayload = jwt.verify(token, secret_key, { algorithms: ['HS256'] });

		req.user = jwtPayload;

		next();
	} catch (error) {
		console.error(error);
		return res.status(403).json({
			success: false,
			message: 'Invalid signature!',
		});
	}
};

const checkLevel = async (req, res, next) => {
	if (req.user && req.user.role == 'admin') {
		next();
	} else {
		console.log(req.user ? req.user.role : 'undefined');
		return res.status(403).json({
			success: false,
			message: 'Unauthorized: Only admins are allowed to perform this action',
		});
	}
};

module.exports = { authenticateUser, checkLevel };
