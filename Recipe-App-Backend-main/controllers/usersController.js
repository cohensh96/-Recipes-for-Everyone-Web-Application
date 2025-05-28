const User = require('../models/Users');
const Recipe = require('../models/Recipes');
const Comment = require('../models/Comments');
const bcrypt = require('bcrypt');

/**
 * Retrieves all users from the database.
 * Returns an array of user objects.
 */
const getAllUsers = async(req,res) => {
    const users = await User.find();
    if(!users)
        return res.status(204).json({"message":"No users found"});
    res.json(users);
}
/**
 * Deletes a user with the provided id.
 * Requires the user id to be passed in the request body.
 * Deletes all associated comments and recipes by the user.
 * Returns the deletion result.
 */
const deleteUser = async(req,res) => {
    if(!req?.body?.id)
        return res.status(400).json({"message":"User ID required"});
    const user = await User.findOne({_id: req.body.id}).exec();
    if(!user)
    {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    try {
        await Comment.deleteMany({author: user.username});
        const userRecipes = await Recipe.find({author: user.username});
        
        await Promise.all(userRecipes.map( async(recipe) => {
            await Comment.deleteMany({recipeId:recipe._id});
        }));
        await Recipe.deleteMany({author: user.username});
        const result = await user.deleteOne();
        res.json(result);
    } catch (error) {
        res.status(500).json({"message":error.message});
    }
}
/**
 * Edits the roles of a user with the provided id.
 * Requires the user id to be passed in the request body.
 * Allows updating the roles field of the user.
 * Returns the updated user object.
 */
const editRolesUser = async(req,res) => {
    if(!req?.body?.id)
        return res.status(400).json({"message":"User ID required"});
    const user = await User.findOne({_id: req.body.id}).exec();
    if(!user)
    {
        return res.status(400).json({ 'message': `User ID ${req.body.id} not found` });
    }
    if(req.body?.roles) user.roles = req.body.roles;
    const result = await user.save();
    res.json(result);
}
/**
 * Retrieves the JWT token for the authenticated user.
 * Requires the user to be logged in.
 * Retrieves the user from the database based on the username.
 * Returns the user object with the password and refresh token fields set to "SECRET" for security reasons.
 */
const getUserJWT = async(req,res) => {
    if(!req.user)
        return res.status(400).json({ "message": 'User must be logged in' });
    const user = await User.findOne({ username:req.user}).exec();
    if(!user)
    {
        return res.status(204).json({'message': `Username ${req.params.id} not found` })
    }
    // API is avaiable to everyone we will use this as a secert protecter
    user.password = "SECRET-PASSWORD";
    user.refreshToken = "SECERT-REFRESH";
    res.json(user);
}
/**
 * Retrieves a user with the provided id.
 * Requires the user id to be passed as a parameter in the request.
 * Returns the user object with the password and refresh token fields set to "SECRET" for security reasons.
 */
const getUser = async(req,res) => {
    if(!req.params?.id)
        return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id:req.params.id}).exec();
    if(!user)
    {
        return res.status(204).json({'message': `User ID ${req.params.id} not found` })
    }
    // API is avaiable to everyone we will use this as a secert protecter
    user.password = "SECRET-PASSWORD";
    user.refreshToken = "SECERT-REFRESH";
    console.log(user)
    res.json(user);
}
/**
 * Updates a user with the provided data.
 * Requires the user id to be passed in the request body.
 * Allows updating various fields of the user, such as password, first name, last name, and confirm.
 * Hashes the new password using bcrypt before saving it to the database.
 * Returns the updated user object.
 */
const updateUser = async (req, res) => {
    if(req?.body === undefined)
        return res.status(404).json({"message":"Missing few fields in user data."});
   
    if (!req?.body?.id) {
      return res.status(400).json({ "message": 'User ID required' });
    }

    try {
        const foundUser = await User.findOne({ _id:req.body.id}).exec();
        if(!foundUser)
        {
            return res.status(404).json({ 'message': `User ID ${req.body.id} not found` });
        }
        
        if(req.body?.password)  foundUser.password = req.body.password
        if(req.body?.firstname) foundUser.firstname = req.body.firstname
        if(req.body?.lastname)  foundUser.lastname = req.body.lastname
        if(req.body?.confirm)   foundUser.confirm = req.body.confirm

        if(req?.body?.password !== req?.body?.confirm)
            return res.status(404).json({"message":"Some fields does not meet the requrements."});
        
        if(req.body?.password) foundUser.password = await bcrypt.hash(req.body.password, 10);

        const result = await foundUser.save();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error" });
    }
  };

module.exports = {
    getAllUsers,
    deleteUser,
    getUserJWT,
    editRolesUser,
    updateUser,
    getUser
}