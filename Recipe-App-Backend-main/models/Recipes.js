const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    author: {
        type:String,
        required: true,
    },
    recipeName: {
        type:String,
        required: true,
    },
    recipeDescription: {
        type:String,
        required: true,
    },
    recipeIngredients: {
        type:Array,
    },
    recipeCategorys:{
        type:Array,
    },
    recipeDifficulty: {
        type:String,
        default: "Easy",
    },
    recipeCallories: {
        type:Number,
    },
    recipeTime: {
        type:String,
    },
    recipeRating: {
        type:Number,
        default: 0
    },
    recipeComments: {
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Image: {
        type:String,
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;