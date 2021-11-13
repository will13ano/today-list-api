const mongoose = require('../database');

const ListSchema = new mongoose.Schema({
  nome : {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
  },
  todos: [{
    descricao: String,
    feito: Boolean,
  }], 
});

const List = mongoose.model('List', ListSchema);

module.exports = List;