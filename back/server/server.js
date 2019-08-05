const cors = require('cors');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

/* Constantes que van a recibir el path de las rutas  */ 
const productRoutes = require('./api/routes/routes.usuario');
const RegisterUser = require ('./api/routes/register');
const LoginUser = require('./api/routes/login');




/*middelware's*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json para que el servidor entienda el json
app.use(bodyParser.json())
//aceptar peticiones 
app.use(cors());

// conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) =>{
    if(err){
        throw err
    }else{
        console.log("DATABASE ONLINE");
    }
});

// middlewares que van a recibir las peticiones  rutas 
app.use('/usuario',productRoutes);
app.use('/register',RegisterUser);
app.use('/login',LoginUser);










   


/*SERVIDOR */ 
app.listen(3000, () =>{

    console.log("Listen the 3000 port ");
})

module.exports = app;