const express = require('express');
const router = express.Router();

const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');
const verifyJWT = require('../middleware/verfiyJWT')

// Controller.
const commentsController = require('../controllers/commentController');

/**
 * Defining the routes for the comment functionality.
 * These routes handle operations related to comments.
 */

// Route for retrieving comments by user
router.route('/')
    .get(verifyJWT, commentsController.getUserComments)
// Route for retrieving all comments by user (admin access only)
router.route('/admin/:id')
    .get(verifyJWT,verifyRoles(ROLES_LIST.Admin), commentsController.getUserAllComments)    
// Route for retrieving comments for a specific recipe, posting a new comment, deleting a comment, and updating a comment
router.route('/:id')
    .get(commentsController.getRecipeComments)
    .post(verifyJWT, commentsController.postRecipeComment)
    .delete(verifyJWT, commentsController.deleteComment)
    .put(verifyJWT, commentsController.updateComment)

module.exports = router; 