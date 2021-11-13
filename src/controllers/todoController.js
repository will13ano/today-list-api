const express = require('express');
const listService = require('../services/listService');
const userService = require('../services/userService');
const authMiddleware = require('../middlewares/auth');
const router  = express.Router();

router.use(authMiddleware);

router.post('/lista/:id/todo', async (req,res)  => {
  const { id }  =  req.params;
  const { todo } = req.body;
  const user_id = req.userId;

  try {
    const user = await userService.findById(user_id);

    if (!user) {
      throw { error: "USUARIO NAO ENCONTRADO" };
    }
    
    const lista = await listService.findById(id);

    if (lista.user_id != user_id) {
      throw { error: "LISTA NÃO PERTENCE A ESSE USUARIO" };
    }

    const task = await lista.todos.create(todo);
    lista.todos.push(task);
    lista.save();
    
    res.send(lista);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/lista/:id_lista/todo/:id', async (req, res) => {
  const { id_lista, id } = req.params;
  const user_id = req.userId;

  try {
    const lista = await listService.findById(id_lista);

    if (lista.user_id != user_id) {
      throw {error: "ESSA LISTA NAO PERTENCE AO USUARIO"};
    }

    lista.todos.id(id).remove();
    lista.save();
  
    res.send(lista);
  }catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app => app.use('', router);