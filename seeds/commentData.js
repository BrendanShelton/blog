const { Comment } = require('../models');

const commentdata = [
  {
    content: 'examplecomment1',
    author_id: 2,
    post_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;