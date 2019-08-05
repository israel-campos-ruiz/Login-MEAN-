/*requerimos a mongoose */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// creamos un molde para nuestra plantilla con Schema 
let Schema = mongoose.Schema;

// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USE_ROLE'],
//     message: '{VALUE} no es un rol valido '
// }



// creamos la coleccion como tal 

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'nombre requerido']
    },
    email:{
        type:String,
        unique:true,
        required:false
    },
    password:{
        type:String,
        required:[true,'contraseña requerida ']
    },
    img:{
        type:Buffer,
        require:false
    },
    role:{
        type:String,
        default: 'USER_ROLE',
        // enum:rolesValidos
    },
    estado:{
        type:Boolean,
        default:true

    },
    google:{
        type:Boolean,
        default:false
    }

});


usuarioSchema.plugin(uniqueValidator,{message: '{PATH} el correo debe de ser unico'});

//Exportamos el modelo como tal 

module.exports = mongoose.model('usuario', usuarioSchema);

// con esto quitamos una propiedad del schema luego veré como hacerlo con spread 
usuarioSchema.methods.toJson = function () {
  let user = this;
  let userObj = user.toObject();
  delete userObj.password;
  return userObj;

}

