const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/post/:id', async (req, res) => {
  res.render("editPost")
});

router.get('/post', async (req, res) => {
  res.render("newPost")
});

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User}],
      order: [['postDate', 'DESC']], 
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Dashboard route
router.get('/partials/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('post');
});

//Comment route
router.get('/partials/comment', (req, res) => {
  if (req.session.comment) {
    res.redirect('/');
    return;
  }
  res.render('comment');
});

module.exports = router;
