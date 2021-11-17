const List = require('../models/lists');
const Colors = require('../models/colors');

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

const getColor = async () => {
  const colors = await Colors.find({});
  const color = colors.shift();

  await Colors.deleteOne({_id: color._id});
  await Colors.create({cod: color.cod});

  return color;
}

module.exports = {
  createList,
  findAllByUserId,
  findById,
  deleteById,
  updateLista,
  getColor
}