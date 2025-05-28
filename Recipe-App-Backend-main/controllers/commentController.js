
/**
 * Importing the necessary models and dependencies required for comment handling.
 */
const Comment = require('../models/Comments.js');
const Recipe = require('../models/Recipes.js')
const ROLES_LIST = require('../config/rolesList');
/**
 * Retrieves the latest 3 comments posted by the authenticated user.
 * Returns an array of comments along with their corresponding recipes.
 */
const getUserComments = async(req,res) => { 
    const comments = await Comment.find({author: req.user}).sort({createdAt: -1}).limit(3).exec();

    if(!comments)
        return res.status(204).json({"message": "No comments"});
    
    let commentsRecipes = [];
    await Promise.all(comments.map( async(comment) => {
            const recipe =  await Recipe.find({_id:comment.recipeId});
            commentsRecipes.push({comment, recipe:{...recipe}});
    }));
    res.json(commentsRecipes);
}

/**
 * Retrieves all comments posted by a specific user.
 * Requires the user id as a parameter in the request.
 * Returns an array of comments along with their corresponding recipes.
 */
const getUserAllComments = async(req,res) => { 
    if(!req.params?.id)
        return res.status(400).json({ "message": 'user id required' });
    try {
        const comments = await Comment.find({author: req.params.id}).sort({createdAt: -1}).exec();
    
        if(!comments)
            return res.status(204).json({"message": "No comments"});
        
        let commentsRecipes = [];
        await Promise.all(comments.map( async(comment) => {
                const recipe =  await Recipe.find({ _id:comment.recipeId});
                if(recipe)
                    commentsRecipes.push({comment, recipe:{...recipe}});
        }));
        res.json(commentsRecipes);
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}
/**
 * Retrieves all comments for a specific recipe.
 * Requires the recipe id as a parameter in the request.
 * Returns an array of comments.
 */
const getRecipeComments = async (req,res) => {
    if(!req.params?.id)
        return res.status(400).json({ "message": 'recipe id required' });
    const comments = await Comment.find({ recipeId: req.params.id }).exec(); // returns all found recipes.
    if(!comments)
     return res.status(204).json({'message': 'No Comments'}) 
    res.json(comments);
 }
/**
 * Updates a comment with the provided id.
 * Requires the comment id as a parameter in the request.
 * Only the comment author can update their own comment.
 * Allows updating the comment text and the comment rating.
 * Returns the updated comment.
 */
 const updateComment = async(req,res) => {
    if(!req?.params?.id)
    {
        return res.status(400).json({"message": "id of comment is required"})
    }

    const findComment = await Comment.findOne({ _id: req.params.id }).exec();
    if(!findComment)
    {
        return res.status(400).json({"message": `Comment id ${req.params.id} not found`}); 
    }
    if(findComment.author !== req.user)
    {
        return res.status(401).json({"message": `You have no permissions to edit the recipe`}); 
    }
    const findRecipe = await Recipe.findOne({_id: findComment.recipeId}).exec();
    if(req.body?.data?.comment)       findComment.comment = req.body.data?.comment;
    if(req.body?.data?.rating)        
    {
        findRecipe.recipeRating += (req.body?.data?.rating - findComment.rating);
        findComment.rating = req.body.data?.rating;
    }

    const result = await findComment.save();
    res.json(result);
}

/**
 * Deletes a comment with the provided id.
 * Requires the comment id as a parameter in the request.
 * Only the comment author or an admin can delete a comment.
 * Updates the corresponding recipe's comment count and rating.
 * Returns the deletion result.
 */
const deleteComment = async(req,res) => {
    if(!req?.params?.id) 
        return res.status(400).json({'message': "Comment id required"});

    const findComment = await Comment.findOne({ _id: req.params.id }).exec();
    if(!findComment) 
    {
        return res.status(204).json({"message": `Comment id ${req.params.id} not found`}); 
    }
    if(req.roles.includes(ROLES_LIST.Admin) !== true)
    {
        if(findComment.author !== req.user)
        {
            return res.status(401).json({"message": `You have no permissions to delete the comment`}); 
        }
    }
    const findRecipe = await Recipe.findOne({_id: findComment.recipeId}).exec();
    if(findRecipe.recipeComments > 0)
        findRecipe.recipeComments -= 1;
    if(findRecipe.recipeRating > 0)
        findRecipe.recipeRating -= findComment.rating;
    await findRecipe.save();

    const result = await findComment.deleteOne();
    res.json(result);
}
/**
 * Posts a comment for a specific recipe.
 * Requires the recipe id as a parameter in the request.
 * Requires the comment text and rating in the request body.
 * The comment author must not be the recipe author.
 * Creates a new comment document and updates the corresponding recipe's comment count and rating.
 * Returns the created comment.
 */
const postRecipeComment = async(req,res) => {
    if(!req.params?.id)
        return res.status(400).json({ "message": 'recipe id required' });

    const findRecipe = await Recipe.findOne({ _id: req.params.id }).exec();
    if(!req?.body?.comment )
        return res.status(400).json({ "message": 'comment is required' });
    if(!req?.body?.rating)
        return res.status(400).json({ "message": 'rating is required' });
    if(req.user === findRecipe.author)
        return res.status(403).json({"message": "Author cannot comment on his recipe"})
    try 
    {
            const result = await Comment.create({
                author: req.user,
                recipeId: req.params.id,
                comment: req.body.comment,
                rating: req.body.rating
            });
            findRecipe.recipeComments += 1;
            findRecipe.recipeRating += req.body.rating;
            await findRecipe.save();
            res.status(201).json(result);
    } catch (error) {
        res.status(500).json({"message":"Server Error"})
    }
 }

 module.exports = {
    postRecipeComment,
    getUserAllComments,
    getUserComments,
    getRecipeComments,
    updateComment,
    deleteComment
}