const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
// PERMITIR A APLICAÇÃO A RECEBER PARAMS
app.use(express.urlencoded({ extended: true }));

require('./controllers/authController')(app);
require('./controllers/listController')(app);
require('./controllers/todoController')(app);

app.listen(3000, () => {
  console.log('ESCUTANDO...');
});