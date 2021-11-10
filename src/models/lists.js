const mongoose = require('../database');

const ListSchema = new mongoose.Schema({
  nome : String,
  color: String,
  todos: [{
    descricao: String,
    feito: Boolean,
  }], 
});

const List = mongoose.model('List', ListSchema);

module.exports = List;