const express = require('express');
const router = express.Router();
// const getPosts = require('../controllers/posts.js');
// const createPost = require('../controllers/posts.js');

var { getPosts, createPost, updatePost, deletePost, likePost} = require('../controllers/posts.js');

// localhost:5000/post/ -- works
// localhost:5000/ -- doesnot since we have prepended posts in the index.js 

router.get('/', getPosts);

router.post('/', createPost);

router.patch('/:id',updatePost);

router.delete('/:id',deletePost);

router.patch('/:id/likePost',likePost);

module.exports = router;