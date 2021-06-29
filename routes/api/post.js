const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route post api/post
//@desc create a post
//@access  private
router.post(
  '/',
  [auth, [check('text', 'adding text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select('-password'); //find the user and get it from db without the password

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route get api/post
//@desc get all posts
//@access  private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //sort by the most recent first that why we used the negative 1
    res.json(posts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route get api/post/:id
//@desc get single post by the id
//@access  private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found ' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found ' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route DELETE api/post/:id
//@desc DELETE post
//@access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    //remove Post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found ' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }
    await post.remove();
    res.json('Post removed');
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found ' });
    }
    res.status(500).send('Server error');
  }
});

//@route get api/post/like/:id
//@desc like a post
//@access  private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
  
      return res.status(400).json({ msg: 'post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

  

module.exports = router;
