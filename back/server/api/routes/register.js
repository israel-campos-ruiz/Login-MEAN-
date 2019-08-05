const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretWord = 'hola-soy-el-token';
const expireTime = 60*60*24*30;
let Register = require('../models/register.model');


router.post('/',(req,res) => {
    let body = req.body;

    register = new Register({
    
        nombre: body.nombre,
        email:body.email,
        password: bcrypt.hashSync( body.password, 10)
    
    });


    register.save((err, RegisterUSer) =>{
        if (err) {
            return res.status(409).json({
                ok: false,
                err: err,
                Message: 'El usuario ya está  registrado'
            });

        }
        // aqui va el token 
        let token = jwt.sign({register: RegisterUSer.id},secretWord,{expiresIn : expireTime});

        const USERDATA = {
             id:RegisterUSer.id,
               nombre:RegisterUSer.nombre,
               email:RegisterUSer.email,
               token:token,
               expiresIn:expireTime
        }

        //respuesta

        res.json({
            ok:true,
            dataUser:USERDATA,
            token

        })
    })

    
})
module.exports = router;
