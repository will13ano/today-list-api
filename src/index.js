const express = require('express');
const List = require('./models/lists.js');

const app = express();

app.use(express.json());
// PERMITIR A APLICAÇÃO A RECEBER PARAMS
app.use(express.urlencoded({ extended: true }));

require('./controllers/authController')(app);
require('./controllers/listController')(app);

app.listen(3000, () => {
  console.log('ESCUTANDO...');
});