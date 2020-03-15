const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const Clientes = new Schema({
  nombre:{
    type:String,
    trim:true,
    require:[true,'Agrega tu Nombre']
  },
  apellido:{
    type:String,
    trim:true,
    require:[true,'Agrega tu Apellido']
  },
  empresa:{
    type:String,
    trim:true
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
  telefono:{
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
module.exports = model('clientes', Clientes);