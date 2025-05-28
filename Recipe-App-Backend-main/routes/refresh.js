const express = require('express');
const router = express.Router();
// Controller.
const loginController = require('../controllers/authController');

/**
 * Route: /refresh
 */

// GET /refresh
// Route for refreshing the access token

router.route('/').get(loginController.handleRefresh) 


module.exports = router;