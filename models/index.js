const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like')

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

/*Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});*/

User.belongsToMany(Post, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Comment,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'commented_posts'
});
// Tags belongToMany Products (through ProductTag)
Post.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Comment,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'commenters'
});

User.belongsToMany(Post, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Like,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'liked_posts'
});
// Tags belongToMany Products (through ProductTag)
Post.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Like,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'liked_by'
});

module.exports = { User, Post, Comment, Like};
