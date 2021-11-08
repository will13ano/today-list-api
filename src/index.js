const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
// PERMITIR A APLICAÇÃO A RECEBER PARAMS
app.use(express.urlencoded({ extended: true }));

require('./controllers/authController')(app);

app.listen(3000, () => {
  console.log('ESCUTANDO...');
});