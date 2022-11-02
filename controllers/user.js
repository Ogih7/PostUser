const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sign_up = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.findOne({username: username})
        if(user) return res.status(400).json({message: 'User exists Already'})
        const newUser = new User({
            username:username,
            password:password
        })
        await newUser.save()
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET)
        res.status(200).json({msg:"User created successfully",
              user:newUser.username, token:token})
    } 
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message});
    }
}

const sign_in = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.findOne({username: username})
        if(!user) return res.status(400).json({message:'User does not exist'})
        if(password !== user.password) return res.status(401).json({message: 'Password Incorrect'})
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
        res.json({
            message:"User logged in successfully",
            token,
            user: {
                id: user.id,
                username: user.username
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
}
module.exports = {sign_up, sign_in}