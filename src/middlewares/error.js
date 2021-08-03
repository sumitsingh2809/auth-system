const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console
    if (err.name !== 'ValidationError') {
        console.log(err);
        console.log(err.name);
    }

    // validation error
    if (err.name === 'ValidationError') {
        const message = `${err.message}`;
        error = new ErrorResponse(message, 400);
    }

    // JWT Token Expired Error
    if (err.name === 'TokenExpiredError') {
        const message = `${err.message}`;
        error = new ErrorResponse(message, 403);
    }

    // JWT Token Authorization Error
    if (err.name === 'AuthorizationError') {
        const message = `${err.message}`;
        error = new ErrorResponse(message, 401);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: {
            code: error.statusCode || 500,
            name: err.name || 'Server Error',
            message: error.message,
        },
    });
};

module.exports = errorHandler;
