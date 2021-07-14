const express = require('express');
const router = express.Router();
// const getPosts = require('../controllers/posts.js');
// const createPost = require('../controllers/posts.js');

const auth = require('../middleware/auth.js');

var { getPosts, createPost, updatePost, deletePost, likePost} = require('../controllers/posts.js');

// localhost:5000/post/ -- works
// localhost:5000/ -- doesnot since we have prepended posts in the index.js

router.get('/', getPosts);

router.post('/', auth ,createPost);

router.patch('/:id',auth,updatePost);

router.delete('/:id',auth,deletePost);

router.patch('/:id/likePost',auth,likePost);//if we call the middleware before controller then we have access to the populate the req and we have access to that request

module.exports = router;
