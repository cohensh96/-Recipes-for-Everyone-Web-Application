const express = require('express');
const router = express.Router();
// Controller.
const loginController = require('../controllers/authController');


/**
 * Defining the route for the login functionality.
 * This route is accessible via a POST request to the root path ('/').
 * When a POST request is made to this route, the loginController's handleLogin function is invoked.
 */

router.route('/').post(loginController.handleLogin);


module.exports = router;