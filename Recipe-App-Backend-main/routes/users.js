const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');
const verifyJWT = require('../middleware/verfiyJWT');

/**
 * Route: /users
 */

// GET /users
// PUT /users
// Route for retrieving and updating user information

router.route('/').get(verifyJWT,usersController.getUserJWT)
                 .put(verifyJWT,usersController.updateUser);
/**
 * Route: /users/handle
 */

// GET /users/handle
// PUT /users/handle
// DELETE /users/handle
// Route for handling user management operations (only accessible by admins)

router.route('/handle')
.get(verifyJWT,verifyRoles(ROLES_LIST.Admin),usersController.getAllUsers)
.put(verifyJWT,verifyRoles(ROLES_LIST.Admin), usersController.editRolesUser)
.delete(verifyJWT,verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

/**
 * Route: /users/:id
 */

// GET /users/:id
// Route for retrieving user information by ID (only accessible by admins)

router.route('/:id').get(verifyJWT,verifyRoles(ROLES_LIST.Admin), usersController.getUser);


module.exports = router;