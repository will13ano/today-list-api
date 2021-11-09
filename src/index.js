const express = require('express');

const app = express();

// PERMITIR A APLICAÇÃO RECEBER CORPO DE REQUISIÇÃO
app.use(express.json());

// PERMITIR A APLICAÇÃO A RECEBER PARAMS
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('ESCUTANDO...');
});