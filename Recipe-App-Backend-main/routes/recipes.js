const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/verfiyJWT')
// Controller.
const recipeController = require('../controllers/recipesController');
const upload = require('../middleware/upload')
const uniqeFile = require('../middleware/uniqeFile')

/**
 * Route: /recipes
 */

// GET /recipes
// Route for getting all recipes

// POST /recipes
// Route for creating a new recipe
// The uniqeFile and upload middleware are used to handle file uploads.
// The verifyJWT middleware is used to verify the JWT for authentication.

// PUT /recipes
// Route for updating a recipe
// The verifyJWT middleware is used to verify the JWT for authentication.


// DELETE /recipes
// Route for deleting a recipe
// The verifyJWT middleware is used to verify the JWT for authentication.

router.route('/')
    .get(recipeController.getAllRecipes)
    .post(uniqeFile, verifyJWT,upload.single('uploadedImage'), recipeController.createRecipe)
    .put(verifyJWT,recipeController.updateRecipe)
    .delete(verifyJWT,recipeController.deleteRecipe);
/**
 * Route: /recipes/top
 */

// GET /recipes/top
// Route for getting the top rated recipes

router.route('/top')
    .get(recipeController.getBestRecipes);
    /**
 * Route: /recipes/search/:userlimit?
 */

// GET /recipes/search/:userlimit?
// Route for searching user recipes with optional limit
// The verifyJWT middleware is used to verify the JWT for authentication.
router.route('/search/:userlimit?')
        .get(verifyJWT,recipeController.getUserRecipes);

/**
 * Route: /recipes/avarage
 */

// GET /recipes/avarage
// Route for getting the average rating of user recipes
// The verifyJWT middleware is used to verify the JWT for authentication.
router.route('/avarage')
        .get(verifyJWT, recipeController.getUserAvarage);

/**
 * Route: /recipes/:id
 */

// GET /recipes/:id
// Route for getting a single recipe by ID
router.route('/:id')
    .get(recipeController.getSingleRecipe);


module.exports = router; 