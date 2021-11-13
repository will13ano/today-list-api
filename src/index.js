const express = require('express');

const app = express();

app.use(express.json());
// PERMITIR A APLICAÇÃO A RECEBER PARAMS
app.use(express.urlencoded({ extended: true }));

require('./controllers/authController')(app);
require('./controllers/listController')(app);
require('./controllers/todoController')(app);

app.listen(3000, () => {
  console.log('ESCUTANDO...');
});