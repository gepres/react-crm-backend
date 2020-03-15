const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const Usuarios = new Schema({
  nombre:{
    type:String,
    trim:true,
    require:[true,'Agrega tu Nombre']
  },
  email:{
    type:String,
    unique:true,
    lowercase:true,
    trim:true,
    require:[true,'Agrega tu Correo']
  },
  password:{
    type:String,
    trim:true
  },
  descripcion:String,
  token:String,
  expira:Date,
  date:{
    type:Date,
    default:Date.now
  }
})

module.exports = model('usuarios', Usuarios);