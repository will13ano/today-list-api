const express = require('express');
const bcrypt = require('bcryptjs');
const userService =  require('../services/userService');
// const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const router = express.Router(); 

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if( await userService.findByEmail(email) ) {
            return res.status(418).send({ error: 'Usuário já existe' });
        }

        const user = await userService.createUser(req.body);

        user.password = undefined;

        return res.send({ user });
    } catch(err){
        return res.status(418).send({ error: 'Falha no registro' });
    }
});

// router.post('/authenticate', async (req, res) => {
//     const { email, password } = req.body;

//     const user = await userService.findByEmailWithPassword(email);

//     if(!user){
//         return res.status(418).send({ error: 'Usuário não encontrado' });
//     }

//     if(!await bcrypt.compare(password, user.password)){
//         return res.status(418).send({ error: 'Senha inválida' });
//     }

//     user.password = undefined;

//     const token = jwt.sign({ id : user.id }, authConfig.secret, {
//         expiresIn: 86400,
//     });

//     res.send({ user, token });
// });

module.exports = app => app.use('/auth', router);