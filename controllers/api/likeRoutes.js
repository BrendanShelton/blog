const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const likeData = await Like.findAll();
    
   // const like = likeData.get({ plain: true });

    res.status(200).json(likeData)
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', withAuth, async (req, res) => {
    try {
      const newLike = await Like.create({
        //...req.body,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
        
      });
  
      res.status(200).json(newLike);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const likeData = await Like.destroy({
        where: {
          post_id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!likeData) {
        res.status(404).json({ message: 'No post or user found with these ids!' });
        return;
      }
  
      res.status(200).json(likeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;