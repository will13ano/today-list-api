const express = require('express');
const listService = require('../services/listService');
const userService =  require('../services/userService');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.use(authMiddleware);
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
  const user_id = req.userId;

  try {
    if (!lista.nome) {
      throw { error: "NOME VAZIO" };
    }

    const user = await userService.findById(user_id);

    if (!user) {
      throw { error: "USUARIO NAO ENCONTRADO" };
    }
    // TODO : GERAR COR IGUAL NO FRONT
    const newLista = await listService.createList({...lista, user_id});

    res.send(newLista);
  }catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/lista/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if ( id === undefined ) {
      throw { error: "SEM ID" };
    }

    const lista = await listService.findById(id);

    if (req.userId != lista.user_id) {
      throw { error: "USUARIO NÃO É O DONO DA LISTA"};
    }

    const deletedLista = await listService.deleteById(id);

    res.status(200).send(deletedLista);
  }catch (e) {    
    res.status(500).send(e);
  }
});

router.get('/listas', async (req, res) => {
  const id = req.userId;

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