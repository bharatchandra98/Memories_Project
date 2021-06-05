const  mongoose  = require('mongoose');
const PostMessage = require('../models/postMessage.js');

const getPosts = async (req,res) =>{
    // res.send('THIS WORKS!');
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }
    catch(exc){
        res.status(404).json({message: exc.message});
    }
}

const createPost = async (req,res) =>{
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(exc){
        res.status(409).json({message : exc.message});
    }
}

const updatePost = async (req,res) =>{
    const { id:_id } = req.params; //renaming the id to _id 
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that ID ');


    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true}); // {new: true} will get the details of updated post from db
    res.json(updatedPost); 
}

const deletePost = async(req,res) =>{
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that ID ');

    await PostMessage.findByIdAndRemove(_id);

    res.json({message : 'Post Deleted Successfully'});
}

const likePost = async(req,res) =>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that ID ');

    const post = await PostMessage.findById(id); //return the post

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount : post.likeCount+1 }, { new: true});

    res.json(updatedPost);
}
module.exports = {getPosts,createPost,updatePost,deletePost,likePost};