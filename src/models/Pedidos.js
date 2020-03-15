const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const Pedidos = new Schema({
  cliente:{
    type:Schema.ObjectId,
    ref:'clientes'
  },
  pedido:[{
    producto:{
      type:Schema.ObjectId,
      ref:'productos'
    },
    cantidad:Number
  }],
  total:{
    type:Number
  },
  date:{
    type:Date,
    default:Date.now
  }
})
module.exports = model('pedidos', Pedidos);