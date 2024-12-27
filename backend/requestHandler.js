import loginSchema from './models/login.model.js';
import userSchema from './models/user.model.js';
import productSchema from './models/product.model.js';
import companySchema from './models/company.model.js';
import categorySchema from './models/category.model.js';
import addressSchema from './models/address.model.js';
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const {sign}=pkg;
const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "felixmathewt@gmail.com",
      pass: "qwvy rccu lwjz rmal",
    },
});
export async function verifyEmail(req,res) {
  const {email}=req.body;
  
try {
   // send mail with defined transport object
//   const info = await transporter.sendMail({
//       from: `"Hai 👻" <${email}>`, // sender address
//       to: `${email}`, // list of receivers
//       subject: "Verify Mail ID", // Subject line
//       text: "Confirm your account", // plain text body
//       html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Account Verification</title>
//   <style>
//       body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 0;
//           background-color: #f4f4f4;
//           color: #333;
//       }
//       .email-container {
//           width: 100%;
//           max-width: 600px;
//           margin: 0 auto;
//           background-color: #fff;
//           border: 1px solid #ddd;
//           padding: 20px;
//           border-radius: 8px;
//           text-align: center;
//       }
//       .btn {
//           display: inline-block;
//           background-color: #4CAF50;
//           color: #fff;
//           text-decoration: none;
//           padding: 15px 30px;
//           margin-top: 20px;
//           border-radius: 4px;
//           font-size: 18px;
//           text-align: center;
//       }
//   </style>
// </head>
// <body>

//   <div class="email-container">
//       <p>Hello,</p>
//       <p>Please verify your email address by clicking the button below.</p>
//       <a href="http://localhost:5173/register" class="btn">Verify Your Account</a>
//   </div>

// </body>
// </html>`, // html body
//   });
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

      return res.status(201).send({msg:"Confirmation mail succefully sent",email});
  } catch (error) {
  
  }


}
export async function signUp(req,res) {
  try {
      const {email,username,password,cpassword,role}=req.body;
      if(!(email&&username&&password&&cpassword&&role))
          return res.status(404).send({msg:"fields are empty"});
      if(password!==cpassword)
          return res.status(404).send({msg:"password not matched"})
      bcrypt.hash(password,10).then((hashedPassword)=>{
        loginSchema.create({email,username,password:hashedPassword,role}).then(()=>{
              return res.status(201).send({msg:"success"});
          }).catch((error)=>{
              return res.status(404).send({msg:"Not registered"})
          })
      }).catch((error)=>{
          return res.status(404).send({msg:error}); 
      })
  } catch (error) {
      return res.status(404).send({msg:error});
  }
}

export async function signIn(req,res) {
  const {email,password}=req.body;
  if(!(email&&password))
      return res.status(404).send({msg:"feilds are empty"})
  const user=await loginSchema.findOne({email})
  if(user===null)
      return res.status(404).send({msg:"invalid email"})
  //convert to hash and compare using bcrypt
  const success=await bcrypt.compare(password,user.password);
  console.log(success);
  if(success!==true)
      return res.status(404).send({msg:"email or password is invalid"})
  //generate token using sign(JWT key)
  const token=await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
  console.log(token);
  return res.status(200).send({msg:"Succefully logged in",token})
}