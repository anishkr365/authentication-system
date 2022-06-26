const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto=require('crypto');
const encrypt = require('../functions/encrypt');
const nodemailer = require('../mailers/forgotpassword');
const TOKEN = require('../models/token');
// const tokens = require('../models/token');



module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: " Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile',{
       
})
    }
    return res.render('user_sign_in', {
        title: " Sign In"
    })
}
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
      req.flash('error','password does not match');
        return res.redirect('back');
    } else {
          req.body.password =  await encrypt.encryption(req.body.password);
          
        try {
            let user = await User.findOne({email : req.body.email});
            if(!user){
              User.create(req.body,function(err){
                  if(err){console.log('pushing value error'); return res.redirect('back')}
                  else{
                     console.log("successfully created"); 
                     req.flash('success','Your account is created');
                     return res.redirect('/users/sign-in')}
              })
  
            } else{
                  req.flash('error','email already exists');
                return res.redirect('back');
            }
        } catch (error) {
            if(err){console.log(err); return res.redirect('back')}
        }
  
     
    }
  
  
}



// module.exports.create = function(req, res){
//     console.log(req.body)
//     if (req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }

//     });
// }
// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash ('success', 'logged in successfully');
    return res.redirect('/');
}
// module.exports.passwordreset = function(req,res){
//     return res.redirect('/users/forget-password')
// }
module.exports.forgot = function(req, res){
    return res.render('forgot', {
        title: 'User Profile'
    })
}
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');

    return res.redirect('/');
}

// rendering forget password form after user clicks on forgot password

module.exports.forgotpage=function(req,res){
    return res.render('forgot');
  }
  
  /// sending link through email
  module.exports.sendlink=async function(req,res){
     
    let USER=await User.findOne({email:req.body.username});
    console.log("this is the user", req.body);
       if(USER){
           let  hex=crypto.randomBytes(20).toString('hex');  
         let Token =await  TOKEN.create({
                        userid:USER._id,
                        token:hex
                    });
                    // USER.updateOne({email:req.body.username},{$set:{token:hex}});
                    setTimeout(function(){
                        Token.remove();
                     },120000);
          
           nodemailer.forgotpassword(req.body.username,Token.token);
           req.flash('success','link sent to this email');
           console.log(Token.token)
           return res.redirect('back');
       }
       else{
           req.flash('error','This email do not exists in the database');
           return res.redirect('back');
       }
    
  }




  
///////////CReate tokens


module.exports.newpassword=function(req,res){
  console.log(req.query.token)
    TOKEN.findOne({token:req.query.token},function(err,Token){
     if(!Token){
        return res.end('<h1> TOKEN EXPIRED :( </h1>');
     }else{
            return res.render('_forgotbymail',{
                    token:Token.token,
                    title:"codieal"
            });
        } 
   });
  
  }
  
  

  
  ///////RESET PASSWORD BEFORE LOGIN 
  module.exports.resetThroughMail= async function(req,res){
     try{
       let Token= await  TOKEN.findOne({token:req.body.token})
      console.log(Token.userid)
       let USER = await  User.findOne({_id:Token.userid});
       console.log(USER.password,USER.name);
              if(req.body.password==req.body.confirmpassword){
                  USER.password=await encrypt.encryption(req.body.password);
                  USER.save();
                  req.flash('success','password changed');
                  return res.redirect('/users/sign-in');
              }else{
                  req.flash('error','password/confirm-password do not match');
                  return res.redirect('back');
              }
        
            }
  
            catch(err){
                 req.flash('error','error in finding database');
                 console.log(err);
                 return res.redirect('back');
            }
    
  
  
  }
  