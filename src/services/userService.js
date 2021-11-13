const User = require('../models/user');

const findByEmail = (email) => {
  return User.findOne({ email });
};

const findByEmailWithPassword = (email) => {
  return User.findOne({ email }).select('+password');
}

const findById = (id) => {
  return User.findOne({_id: id});
}

const createUser = (user) => {
  return User.create(user);
}


module.exports = {
  findByEmail,
  findByEmailWithPassword,
  findById,
  createUser
};