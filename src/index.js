const express = require('express');
const List = require('./models/lists.js');
//const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
// PERMITIR A APLICAÇÃO A RECEBER PARAMS
app.use(express.urlencoded({ extended: true }));

// app.post('/lista', async (req,res) => {
//   try {
//     const lista = await List.create(req.body);
//     res.send(lista);
//   }catch (e) {
//     res.send(e);
//   }
// })

require('./controllers/authController')(app);

app.listen(3000, () => {
  console.log('ESCUTANDO...');
});