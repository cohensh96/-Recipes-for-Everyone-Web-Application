
/**
 * Middleware function to verify user roles.
 * Takes a variable number of allowed roles as parameters.
 * Checks if the user has any of the allowed roles in the request's roles array.
 * If the user has an allowed role, calls the next() function to pass the request to the next middleware.
 * If the user does not have any allowed role, sends a 401 Unauthorized response.
 */
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles