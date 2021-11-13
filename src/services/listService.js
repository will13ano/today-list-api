const List = require('../models/lists');

const createList = (lista) => {
  return List.create(lista);
}

const findAllByUserId = (id) => {
  return List.find({ user_id: id });
}

const findById = (id) => {
  return List.findOne({ _id: id });
}

const deleteById = (id) => {
  return List.deleteOne({_id: id});
}

const updateLista = (id, params) => {
  return List.updateOne({_id: id}, {...params});
}

module.exports = {
  createList,
  findAllByUserId,
  findById,
  deleteById,
  updateLista
}