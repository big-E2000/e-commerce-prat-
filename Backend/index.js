
import express from "express";
import cors  from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import dbConnect from "./config/config.js";
import router from "./Routes/index.js";
import { config } from "./config.js";

dotenv.config()

const app = express()
// parsing json format

app.use(cors({
    origin:config.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
// Router

app.use('/api', router)

const PORT = 8000 || process.env.PORT

dbConnect().then(() => {
    app.listen( PORT, () => {
        console.log('server is running at port 8000')
    })
})
