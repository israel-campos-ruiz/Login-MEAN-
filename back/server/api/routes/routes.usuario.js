const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const router = express.Router();
let Usuario = require('../models/usuario.model');

//llamamos a los registros 
router.get('/', (req, res) => {
    Usuario.find({}).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        res.json(usuarios);
    })
})


//Insertamos un registro 
router.post('/', (req, res) => {
    // req.body se usa para obtener los datos del modelo que enviarás por POST a tu Base de datos   
    let body = req.body;
    //definimos lo que vamos a guardar   
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync (body.password, 10),
        role: body.role,
    });

    //grabamos en la bd
    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    });

})
//actualizamos un registro 
router.put('/:id', (req, res) => {

    let id = req.params.id;
//con undescore js ponemos que propiedades desamos que se puedan actualizar con un array como
// lo puedes ver en la linea de abajo 
    let body = _.pick(req.body,['nombre','email,','img','role','estado']);

    Usuario.findByIdAndUpdate(id, body, {
        new: true
    }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            Usuario: usuarioBD
        })
    })



})
//borramos un registro 
router.delete('/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id,(err,bodyDelete) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            bodyDelete
        })
    })
    // res.send('DELETE WORK');
})

module.exports = router;