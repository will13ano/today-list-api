const express = require('express');
const listService = require('../services/listService');
const userService = require('../services/userService');
const router  = express.Router();

router.post('/lista/:id/todo', async (req,res)  => {
  const { id }  =  req.params;
  const { user_id, todo } = req.body;
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

module.exports = app => app.use('', router);