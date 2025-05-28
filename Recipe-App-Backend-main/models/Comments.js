const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type:String,
        required: true,
    },
    recipeId: {
        type:String,
        required: true,
    },
    comment: {
        type:String,
        required: true,
    },
    rating: {
        type:Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;