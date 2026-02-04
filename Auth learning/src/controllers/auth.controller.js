const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerUser(req,res) {

    const {username, email, password} =req.body

//for checking email exists or not
     const isUserAlreadyExists= await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
        message:"Email Already Exists",
    })
    }

 //will proceed if user is new
    const user=await userModel.create({
        username, email, password 
    })

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User Created Successfully",
        token
    })
}


module.exports= {registerUser}