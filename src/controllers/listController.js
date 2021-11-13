const express = require('express');
const listService = require('../services/listService');
const userService =  require('../services/userService');
const router = express.Router();

router.post('/lista', async (req,res) => {
  const lista = req.body;

  try {
    if (!lista.nome) {
      throw { error: "NOME VAZIO" };
    }
    // TODO : GERAR COR IGUAL NO FRONT
    const newLista = await listService.createList(lista);

    res.send(newLista);
  }catch (e) {
    res.status(500).send(e);
  }
});

router.get('/listas', async (req, res) => {
  const id = req.query.id.toString();

  try {
    if ( id == undefined ) {
      throw { error: "SEM ID" };
    }

    const user = await userService.findById(id);

    if (!user) {
      throw { error: "USUARIO NAO ENCONTRADO" };
    }



    res.send(user);
  }catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app => app.use('' ,router);