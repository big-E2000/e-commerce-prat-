export const userLogOut  = async (req, res) => {
  try {
    res.clearCookie('cookie')
    res.json({
        message: 'logged out successfully',
        error: false,
        success: true,
        data: []
    })
  } catch (error) {
    res.json({
        message : 'logged out not succesfully',
        error: true,
        sucess: false
      })
  }
}