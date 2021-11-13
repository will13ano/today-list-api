const List = require('../models/lists');

const createList = (lista) => {
  return List.create(lista);
}

module.exports = {
  createList,
}