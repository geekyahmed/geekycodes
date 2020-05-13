const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    body: {
        type: String,
        required: true
    },

    full_name: {
        type: String,
        required: true
    },

    email: {
        type: String
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user'
    // },

    date: {
        type: Date,
        default: Date.now()
    },

    commentIsApproved: {
        type: Boolean,
        default: false
    }


});

module.exports = { Comment: mongoose.model('comment', CommentSchema) };