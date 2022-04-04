const mongoose = require('mongoose');

const resetTokens = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isValid:{
        type:Boolean,
        required:true,
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },

});
module.exports = mongoose.model('resetTokens', resetTokens);