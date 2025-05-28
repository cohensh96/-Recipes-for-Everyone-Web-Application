const express = require('express');
const router = express.Router();
// Controller.
const registerController = require('../controllers/registerController');

/**
 * Route: /register
 */

// POST /register
// Route for user registration
router.route('/').post(registerController.registerUser)

module.exports = router;