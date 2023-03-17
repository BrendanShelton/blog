const router = require('express').Router();
const { Post, User, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        { model: User, through: Like, as: 'liked_by' }
      ],
    });
    /*const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, through: Like, as: 'liked_posts' }],
    });*/
    
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    //const user = userData.map((user) => user.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      userId: req.session.user_id,
      logged_in: req.session.logged_in 
    });
    //res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/trending', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        { model: User, through: Like, as: 'liked_by' }
      ],
    });
    
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    //posts.sort((a,b) => (a.liked_by.length > b.liked_by.length) ? 1 : ((b.liked_by.length > a.liked_by.length) ? -1 : 0))
    posts.sort((a,b) => b.liked_by.length - a.liked_by.length)
    console.log(posts[0].liked_by.length, posts[1].liked_by.length)
    console.log(posts)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      userId: req.session.user_id,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
        },
        { model: User, through: Like, as: 'liked_by' }
      ],
    });
    //res.status(200).json(postData)
    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
