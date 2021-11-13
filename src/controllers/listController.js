const express = require('express');
const listService = require('../services/listService');
const userService =  require('../services/userService');
const router = express.Router();

// {
//   "nome": { nome da lista },
//   "user_id": { id do usuario },
//   "todos": [
//      {
//        "description": {decricao},
//        "feito": {default false}
//      }
//   ]
// }
router.post('/lista', async (req,res) => {
  const lista = req.body;
  const { user_id } = req.body;

  try {
    if (!lista.nome) {
      throw { error: "NOME VAZIO" };
    }

    const user = await userService.findById(user_id);

    if (!user) {
      throw { error: "USUARIO NAO ENCONTRADO" };
    }
    // TODO : GERAR COR IGUAL NO FRONT
    const newLista = await listService.createList(lista);

    res.send(newLista);
  }catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/lista', async (req, res) => {
  const id = req.query.id.toString();

  try {
    if ( id === undefined ) {
      throw { error: "SEM ID" };
    }

    const lista = await listService.deleteById(id);
    
    res.send(lista);
  }catch (e) {    
    res.status(500).send(e);
  }
});

router.get('/listas', async (req, res) => {
  const id = req.query.id.toString();

  try {
    if ( id === undefined ) {
      throw { error: "SEM ID" };
    }

    const user = await userService.findById(id);

    if (!user) {
      throw { error: "USUARIO NAO ENCONTRADO" };
    }

    const listas = await listService.findAllByUserId(id);
    res.send(listas);
  }catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app => app.use('' ,router);