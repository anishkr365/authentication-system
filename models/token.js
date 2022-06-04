// const mongoose = require('mongoose');

// const resetTokens = new mongoose.Schema({
//     token: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     expiretoken:Date,
//     user: {
//         type:  mongoose.Schema.Types.ObjectId,
//         ref: 'User'

//     },

// });
// module.exports = mongoose.model('resetTokens', resetTokens);


const mongoose=require('mongoose');

const tokenSchema=mongoose.Schema({
       token:{
           type:String
       },
       userid:{
           type:String
       }
});

const tokens=mongoose.model('tokens',tokenSchema);
module.exports=tokens;