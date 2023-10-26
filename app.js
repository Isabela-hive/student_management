const express = require('express');
const connectdb = require('./config/db');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middlewares/authMiddleware');

const app = express();
require('dotenv').config();

port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(morgan('dev'));
app.use(errorHandler);
app.use(cookieParser());
app.use(checkUser);
// ejs
app.set('view engine', 'ejs');
app.set('layout', 'layout/main');

// let loggedIn = false;
app.use('/', require('./routes/authRouter'));
app.use('/dash', requireAuth, require('./routes/studentRouter'));
// routes

app.get('/', (req, res) => {
	res.render('home1');
});
// protected route
app.get('/dashboard', requireAuth, (req, res) => {
	const user = res.locals.user;

	res.render('dashboard', { user });
});

app.get('*', checkUser);
app.use((req, res) => {
	res.render('404');
});
const start = async () => {
	try {
		await connectdb();
		await app.listen(port, () => {
			console.log('Server is running on localhost:', port);
		});
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
start();
