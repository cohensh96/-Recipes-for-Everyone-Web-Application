const jwt = require('jsonwebtoken');
/**
 * Middleware function to verify and decode a JSON Web Token (JWT) from the request headers.
 * Extracts the JWT from the 'Authorization' or 'authorization' header.
 * Verifies the JWT using the provided secret and handles the decoded payload.
 * Sets the user information and roles from the decoded payload to the request object.
 * Calls the next() function to pass the request to the next middleware.
 */
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.firstname = decoded.UserInfo.firstname;
            req.lastname = decoded.UserInfo.lastname;
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT;
