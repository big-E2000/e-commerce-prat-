import express, {  Router } from 'express' 
import  signUp  from '../controller/useSignUp.js'
import login from '../controller/useSignin.js'
import { authToken } from '../middleware/authToken.js'
import { userDetail } from '../controller/userDetail.js'
import { userLogOut } from '../controller/userLogout.js'
import { allUsers } from '../controller/allUser.js'

const router = express.Router()

router.post("/signUp", signUp)
router.post ('/signIn', login)
router.get('/user-detail', authToken, userDetail)
router.get('/Logout', userLogOut)

// admin panel

router.get('/alluser', authToken, allUsers)


export default router
