const { Post } = require('../models');

const postdata = [
  {
    title: 'examplepost1',
    content: 'examplecontent1',
    user_id: 1
  },
  {
    title: 'examplepost2',
    content: 'examplecontent2',
    user_id: 2
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;