const bcrypt = require('bcryptjs');
// var hashpassword;
module.exports.encryption = async function (password) {
   //   let password = req.body.password;

   // Encryption of the string password

   try {
      let salt = await bcrypt.genSalt(10);

      // The bcrypt is used for encrypting password.
      password = await bcrypt.hash(password, salt)





   }
   catch (error) {
      if (error) { console.log(error); }
   }
   // next();
   console.log(password);
   return password;
}

// module.exports.dencryption = async function (password) {
//    // Load hash from your password DB.
//    var flag ;
//    bcrypt.compare("password", hashpassword, async function (err, res) {
//       // res === true 

//       flag= res;
//    });
//    return flag;
// }
