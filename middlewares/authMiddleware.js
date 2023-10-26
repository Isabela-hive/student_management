const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	// console.log(token);
	if (token) {
		jwt.verify(token, 'isabellah', (err, decodedToken) => {
			if (err) {
				// console.log(err.message);
				res.redirect('/login');
			} else {
				// console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};

// check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, 'isabellah', async (err, decodedToken) => {
			if (err) {
				// console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				// console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};
const requireAdmin = async (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		try {
			const decodedToken = jwt.verify(token, 'isabellah');
			const user = await User.findById(decodedToken.id);

			if (user.role === 'admin') {
				req.user = user;
				next();
			} else {
				res.status(403).send('Access forbidden');
			}
		} catch (err) {
			// console.log(err.message);
			res.redirect('/login');
		}
	} else {
		res.redirect('/login');
	}
};

module.exports = { requireAuth, requireAdmin, checkUser };
