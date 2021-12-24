const mongoose = require('../database');

const ColorSchema = new mongoose.Schema({
  cod: {
    type: String,
    required: true
  }
});

const Colors = mongoose.model('Color', ColorSchema);

module.exports = Colors;