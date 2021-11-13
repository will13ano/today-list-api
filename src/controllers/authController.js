const express = require('express');
const bcrypt = require('bcryptjs');
const userService =  require('../services/userService');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const router = express.Router(); 

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if( await userService.findByEmail(email) ) {
            return res.status(418).send({ error: 'Usuário já existe' });
        }

        const user = await userService.createUser(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });
    } catch(err){
        return res.status(418).send({ error: 'Falha no registro' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.findByEmailWithPassword(email);

    if(!user){
        return res.status(418).send({ error: 'Usuário não encontrado' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(418).send({ error: 'Senha inválida' });
    }

    user.password = undefined;

    res.send({ 
        user,
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/auth', router);