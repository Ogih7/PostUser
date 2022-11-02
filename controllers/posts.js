const Post = require('../models/posts')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createPost = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const { title, content, time } = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if(!user) return res.status(401).json({message: 'Unauthorized'})
        const newPost =  new Post({
            title: title,
            content: content,
            time: time,
            createdBy: user._id
        })
        await newPost.save();
        res.status(201).json({message: 'Post has been created', data: newPost})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const deletePost = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params.id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if(!user) return res.status(401).json({message: 'Unauthorized'})
        const post = await Post.findById(id)
        if(!post) return res.status(401).json({message: "Post not found"})
        await post.remove();
        res.status(200).json({message: "Post deleted successfully", data: post})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message})
    }
}


module.exports = {createPost, deletePost}