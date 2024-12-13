import User from "../Models/userModel.js";
import bcrypt from 'bcryptjs'


const signUp = async (req, res) => {
    try {
     const {name, email, password } = req.body 

     if(!name) {
         throw new Error("pls provide name");
     }
     if(!email) {
         throw new Error("pls provide email");
     }
     if(!password) {
         throw new Error("pls provide password");
     }

     const user =await User.findOne({email})
     
     if (user) {
        throw new Error("user already existed");
     }

     const hashPassword = await bcrypt.hash(password, 12)

     if(!hashPassword) {
        throw new Error('something went wrong')
     }
     const newUser = await User.create({
        ...req.body,
        role: "GENERAL",
        password:hashPassword
      })
      const saveUser = await newUser.save()
      res.status(201).json({
        data : saveUser,
        success: true, 
        error: false,
        message : 'user created successfully'
      })
    } catch (err) {
       res.json({
         message : err.message || err,
         error: true,
         sucess: false
       })
    }
 }
 export default signUp