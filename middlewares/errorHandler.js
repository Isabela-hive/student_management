const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500;

	switch (statusCode) {
		case constants.VALIDATION_ERROR:
			res.json({
				statusCode,
				title: 'Validation error',
				message: err.message,
				stacktrace: err.stack,
			});
			break;
		case constants.NOT_FOUND:
			res.json({
				statusCode,
				title: 'Not found',
				message: err.message,
				stacktrace: err.stack,
			});
		case constants.SERVER_ERROR:
			res.json({
				title: 'Server Error',
				message: err.message,
				stacktrace: err.stack,
			});
		case constants.UNAUTHORIZED:
			res.json({
				title: 'un authorized',
				message: err.message,
				stacktrace: err.stack,
			});
		case constants.FORBIDDEN:
			res.json({
				title: 'forbidden',
				message: err.message,
				stacktrace: err.stack,
			});
		default:
			console.log('No ErrorAll is running well');
			break;
	}
	next();
};
module.exports = errorHandler;
