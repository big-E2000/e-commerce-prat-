 import jwt from "jsonwebtoken";
 import { config } from "../config.js";
 
 export const authToken = async (req, res, next) => {
   try {
    const token =  req.cookies?.cookie 
    if(!token){
      return res.status(200).json({
        message : "user not logged in",
        error: true,
        success: false
      })
    }
    jwt.verify(token, config.SECRET_KEY, function(err, decoded){
        if(err){
          throw new Error("error auth");
        }
        req.userId = decoded?.tokenData._id
        next()
       })
    } catch (err) {
    res.status(400).json({
        message: err.message || err,
        data: [],
        error: true,
        success: false
    })
   }
}
