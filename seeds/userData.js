const { User } = require('../models');

const userdata = [
  {
    username: 'exampleuser1',
    password: 'password1',
  },
  {
    username: 'exampleuser2',
    password: 'password2',
  },
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;