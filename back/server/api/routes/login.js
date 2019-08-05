const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretWord = 'hola-soy-el-token';
const expireTime = 60*60*24*30;
let Login = require('../models/register.model');

router.post('/', (req, res) =>{

    let body = req.body

    Login.findOne({email:body.email}, (err, usuarioLogueado) =>{
            if(!usuarioLogueado){
                return res.status(500).json({
                    ok:false,
                    err:{
                        message:'algo salio mal  correo no registrado'
                    }
                })
            }

           if(!bcrypt.compareSync( body.password, usuarioLogueado.password )){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'algo salio mal contraseña incorrecta '
                    }
                })
           }

           // aqui va a ir el token 

           let token = jwt.sign({Login: usuarioLogueado.id},secretWord,{expiresIn : expireTime}

           );
           
           const DATAUSER = {
               id:usuarioLogueado.id,
               nombre:usuarioLogueado.nombre,
               email:usuarioLogueado.email,
               token:token,
               expiresIn:expireTime

           }
           res.json({
               ok:true,
               dataUser:DATAUSER,
               
        })
    })
})



module.exports = router;