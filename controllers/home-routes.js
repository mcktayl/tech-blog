const router = require('express').Router();
const Post = require('../models/Post');

// homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
