const User = require('../models/userModel');
// const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	if (err.message === 'Incorrect email') {
		errors.email = 'that email is not registered';
	}
	if (err.message === 'Incorrect Password') {
		errors.password = 'that password is incorrect';
	}
	// duplicate error code
	if (err.code === 11000) {
		errors.email = 'that email is already registered';
		return errors;
	}
	// validation errors
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

const maxAge = 24 * 10 * 10 * 1000;
const createTokens = (id) => {
	return jwt.sign({ id }, 'isabellah', {
		expiresIn: maxAge,
	});
};

module.exports.signup_get = async (req, res) => {
	const user = await User.find();
	// res.status(200).json({ count: user.length, user });
	res.render('signup', { user });
};
module.exports.login_get = (req, res) => {
	res.render('login');
};
module.exports.signup_post = async (req, res) => {
	try {
		const { email, password, role } = req.body;

		const user = await User.create({ email, password, role });
		const token = createTokens(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
		// console.log(token);
		res.redirect('/dashboard');
		// res.status(200).json({ user: user._id, email, role });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		// if (!email || !password) {
		// 	res.status(400);
		// 	throw new Error('This fields are mandatory');
		// }
		const user = await User.login(email, password);
		const token = createTokens(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });

		// res.status(200).json({ user: user.role, email });
		// res.send(`Welcome, ${user.role} ${user.email}!`);
		res.redirect('dashboard');
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
module.exports.delete_user = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json('User deleted successfully');
	} catch (err) {
		// nconsole.log(err.message);
		res.status(500).send('Error deleting user');
	}
};

module.exports.logout_get = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/');
};
