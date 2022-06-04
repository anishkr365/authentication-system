const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
// const resetTokens=require('../models/resetTokens');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const usersController = require('../controllers/users_controller');
router.get('/', usersController.profile);
router.get('/profile', passport.checkAuthentication,  usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);





router.get("/forget-password",usersController.forgot);
// router.post("/forget-password",(req,res)=>{
//     crypto.randomBytes(32,(err,buffer)=>{
//       if(err){
//           console.log(err)
//       }
//       const token = buffer.toString("hex")
//       User.findOne({email:req.body.email})
//       .then(user=>{
//           if(!user){
//             req.flash('error_msg','No user with this email')
//             return (res.redirect('/users/forget-password'));  
//           }
//           user.token = token
//           user.expiretoken = Date.now() + 23400000; //token valid for one hour
//           const url = `http://localhost:5000/users/reset/${token}`
//           console.log(url);
//           user.save().then((result)=>{
//               nodemailer.transporter.sendMail({
//                   to:user.email,
//                   from:"NodeJs-Authentication-App ",
//                   subject:"Password reset",
//                   html:`
//                   <p>You requested for password reset</p>
//                   <h5>Click this <a href=${url}>link</a> to reset password</h5>`
//               })
//           })
//           req.flash('success_msg','Password reset link sent')
//           res.redirect('/users/forget-password');
//       })
//     })
//   });
    



router.post('/forget-password',usersController.sendlink);
router.get('/newpassword', usersController.newpassword);
router.post('/mail',usersController.resetThroughMail);



module.exports = router;