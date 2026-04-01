const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const tokenBlacklistModel=require("../models/blacklist.model")

/**
 * @name registerUserController
 * @description Register new user
 * @access public
 */

async function registerUserController(req,res){

    const { username,email,password}=req.body;
    if(!username || !email|| !password){
        return res.status(400).json({message:"provide username, password ,email"})
    }

    const isUserAlreadyExist= await userModel.findOne({
        $or:[{username},{email}]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash=await bcrypt.hash(password,10)

    const user= await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign(
        {
            id:user._id,username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )

    res.cookie('token',token)

    res.status(201).json({
        message:'Account created',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

    }


/**
 * @name loginUserController
 * @description login new user require email and password
 * @access public
 */

async function loginUserController(req,res){
    const{ email, password}=req.body;

    const user= await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:'Invalid email or Password'
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }

    const token=jwt.sign(
        {
            id:user._id,username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )

    res.cookie('token',token)
    res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email

        }
    })
}


/**
 * @route post  /api/auth/logout
 * @description logout  user with email  and password
 * @access public
 */

async function logoutUserController(req,res){

    const token=req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})

    }

    res.clearCookie("token")

    res.status(200).json({
        message:"user logout successfully"
    })


    
}

/**
 * @route GET  /api/auth/get-me
 * @description get the current logged in  user details
 * @access private
 */

async function getMeController(req,res){
    const user= await userModel.findById(req.user.id)// user that we have created in middle ware having decoded token



    res.status(200).json({
        message:"data fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}







module.exports={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}