const nodeMailer=require('../config/nodemailer');

module.exports.forgotpassword=function(email,Token){
   
    nodeMailer.transporter.sendMail({
        from: 'anish.kr365@gmail.com',          // sender address
        to:email ,  // list of receivers
        subject: "Forgot Password",     //  Subject line
        html:  `https://sch-deploy-auth-system.herokuapp.com/users/newpassword/?token=${Token}`
      },function(err,info){
      if(err){console.log("err in sending mail: ",err); return;}
      console.log("message sent",info);
      return;
      });

}