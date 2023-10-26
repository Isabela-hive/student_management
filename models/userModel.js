const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'This field is required'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid Email'],
	},
	password: {
		type: String,
		required: [true, 'This field is required'],
		minlength: [6, 'minimum password length is 6 characters'],
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'other'],
		required: [true, 'Please input this field'],
	},
});
// fire a function  before saving it
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email: email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw new Error('Incorrect Password');
	}
	throw new Error('Incorrect email');
};
const User = mongoose.model('User', userSchema);
module.exports = User;
// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
// const userSchema = new mongoose.Schema({
// 	username: {
// 		type: String,
// 		required: [true, 'This field is required'],
// 	},
// 	email: {
// 		type: String,
// 		required: [true, 'This field is required'],
// 		unique: true,
// 		lowercase: true,
// 		validate: [isEmail, 'please enter a valid email'],
// 	},
// 	password: {
// 		type: String,
// 		required: [true, 'This field is required'],
// 		minlength: 6,
// 	},
// 	role: {
// 		type: String,
// 		enum: ['admin', 'user'],
// 		default: 'user',
// 	},
// });
// userSchema.pre('save', async function (next) {
// 	const salt = await bcrypt.genSalt();
// 	this.password = await bcrypt.hash(this.password, salt);
// 	next();
// });
// userSchema.statics.login = async function (email, password) {
// 	const user = await User.findOne({ email });
// 	if (user) {
// 		const auth = await bcrypt.compare(password, user.password);
// 		if (auth) {
// 			return user;
// 		}
// 		throw new Error('Incorrect password');
// 	} else {
// 		throw new Error('Incorrect email');
// 	}
// };
// const User = mongoose.model('User', userSchema);
// module.exports = User;
