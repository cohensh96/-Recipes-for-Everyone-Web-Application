const express = require('express');
const router = express.Router();
// Controller.
const loginController = require('../controllers/authController');

/**
 * Defining the route for handling user logout.
 * This route handles the GET request for user logout.
 */
router.get('/', loginController.handleLogout);


module.exports = router;