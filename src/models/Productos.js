const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const Productos = new Schema({
  nombre:{
    type:String,
    trim:true,
    require:[true,'Agrega tu Nombre']
  },
  precio:{
    type:Number
  },
  imagen:{
    type:String
  },
  public_id:{
    type:String,
    unique:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})
module.exports = model('productos', Productos);