const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/car');
const protect = require("../middlewares/protect");

router.use(protect);

router.get('/', async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});

router.post('/', async (req, res, next) => {
    const {title, content, imagePath} = req.body;
    console.log(req.user.id);

    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        content: content,
        imagePath: imagePath,
        creator: req.user.id
    });

    const createdPost = await post.save();
    res.status(201).json({
        message: 'Post created successfully',
        post: {
            ...createdPost,
            id: createdPost._id
        }
    });

});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json({
        message: 'Post fetched successfully',
        post: post
    });
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const {title, content, imagePath} = req.body;
    const post = await Post.findByIdAndUpdate(id, {
        title: title,
        content: content,
        imagePath: imagePath
    });
    console.log(post)
    res.sendStatus(200);
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Post deleted successfully',
        post: post
    });
});

// add a comment
router.post('/:id/comment', async (req, res, next) => {
    const id = req.params.id;
    const post = await(Post.findById(id));

    if(!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    const creator = req.user.id;

    const {content} = req.body;

    if(!content || !creator) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    post.comments.push({content, creator});
    const updatedPost = await post.save();

    res.status(200).json({
        message: 'Comment added successfully',
        post: updatedPost
    });
});

//add a like
router.post('/:id/like', async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findById(id)
    if(!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    post.likes++;
    const updatedPost = await post.save();

    res.status(200).json({
        message: 'Like added successfully',
        post: updatedPost
    })
});

module.exports = router;
