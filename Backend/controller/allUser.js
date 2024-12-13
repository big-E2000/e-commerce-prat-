import User from "../Models/userModel.js"

export const allUsers = async (req, res) => {
    try {
        const allUser = await User.find()

        res.json({
            message : 'all user',
            data: allUser,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}