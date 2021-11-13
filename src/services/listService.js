const List = require('../models/lists');

const createList = (lista) => {
  return List.create(lista);
}

const findByUserId = (id) => {
  return List.find({ user_id: id });
}

module.exports = {
  createList,
  findByUserId,
}