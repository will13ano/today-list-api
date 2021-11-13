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
  todos: [
    new mongoose.Schema({
      descricao: {
        type: String,
        required: true
      },
      feito: {
        type: Boolean,
        default: false
      }
    }),
  ], 
});

const List = mongoose.model('List', ListSchema);

module.exports = List;