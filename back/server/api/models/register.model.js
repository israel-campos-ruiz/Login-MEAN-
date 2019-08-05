const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let registerSchema = new Schema({
    nombre: {
        type:String,
        required:[true, 'nombre requerido ']
    },
    password: {
        type:String,
        required:[true, 'contraseña requerida']
    },
    email: {
        type:String,
        unique:[true, 'email requerido ']

    }
})


module.exports = mongoose.model('Register', registerSchema);