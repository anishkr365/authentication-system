const bcrypt = require('bcryptjs');
module.exports.encryption =   async function(password){
//   let password = req.body.password;

  // Encryption of the string password

  try{
     let salt = await  bcrypt.genSalt(10);
  
    // The bcrypt is used for encrypting password.
     password =   await bcrypt.hash(password, salt)
    
   
    
    }
    catch(error){
       if(error){console.log(error);}
    }
    // next();
    console.log(password);
    return password;
}