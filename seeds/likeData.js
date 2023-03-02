const { Like } = require('../models');

const likedata = [
  {
    user_id: 2,
    post_id: 1,
  },
];

const seedLike = () => Like.bulkCreate(likedata);

module.exports = seedLike;