import mongoose from "mongoose";
import { config } from "../config.js";


// DATABASE CONNECTION
 const uri = "mongodb://localhost:27017/e-commerceDB";
 async function dbConnect() {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log('conected to DB')
    } catch (err) {
        console.log(err); 
    }
 }

export default dbConnect;
