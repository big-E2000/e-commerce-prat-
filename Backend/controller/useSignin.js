import User from "../Models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const login = async (req, res) => {
  try {
   const {email, password} = req.body 
   if(!email) {
    throw new Error("pls provide email");
  }

   if(!password) {
    throw new Error("pls provide password");
   }
   const user = await User.findOne({email})

   if(!user) { 
    throw new Error("user not found");
   }

   const comparePassword =await bcrypt.compare(password, user.password)

   if (comparePassword) {
   const tokenData = {
      _id : user._id, 
      email: user.email
    }
    const tokenOption = {
      httpOnly : true,
      secure: true
    }
   const token =  jwt.sign({tokenData}, config.SECRET_KEY, { expiresIn: 60 * 60 * 8});

   res.cookie('cookie', token, tokenOption ).json({
    message:'login succesfully',
    data: token,
    success: true,
    error: false
   })
   
   } else {
     throw new Error('pls check password')
   }

   
  } catch (err) {
    res.json({
        message : err.message || err,
        error: true,
        sucess: false
      })
  }
}
export default login
