import User from "../Models/userModel.js"

export const userDetail =  async (req, res) => {
  try {
   
   const user = await User.findById(req.userId)
   
   res.status(200).json({
    data: user,
    error: false,
    success: true,
    message: "user detail"
   })


  } catch (err) {
    res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
    })
  }
}