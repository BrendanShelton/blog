const { User } = require('../models');

const userdata = [
  {
    name: 'exampleuser1',
    password: 'password1',
  },
  {
    name: 'exampleuser2',
    password: 'password2',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;