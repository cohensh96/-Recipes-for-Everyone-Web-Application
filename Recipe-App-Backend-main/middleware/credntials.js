const allowedOrigins = require('../config/allowedOrigins');
/**
 * Middleware function to handle credentials in CORS headers.
 * Checks if the origin in the request headers is included in the allowedOrigins array.
 * If it is, sets the 'Access-Control-Allow-Credentials' header to true.
 * Calls the next() function to pass the request to the next middleware.
 */
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;