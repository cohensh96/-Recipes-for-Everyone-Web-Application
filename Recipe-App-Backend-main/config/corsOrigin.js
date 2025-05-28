/**
 * Importing the allowedOrigins array from the './allowedOrigins' module.
 * This array contains a list of allowed origins for CORS configuration.
 */
const allowedOrigins = require('./allowedOrigins');

/**
 * Configuration object for CORS (Cross-Origin Resource Sharing).
 * Defines the behavior for allowing or blocking requests from different origins.
 */

const corsSettings = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin)
        {
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsSettings;
