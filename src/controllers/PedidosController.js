const Pedidos = require('../models/Pedidos')

module.exports = {
  listaPedidos:async(req,res,next) => {
    const pedidos = await Pedidos.find({}).populate('cliente').populate({
      path:'pedido.producto',model:'productos'
    })
    try {
      res.status(200).json({
        pedidos
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  queryPedido:async(req,res,next) => {
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
      path:'pedido.producto',model:'productos'
    })
    if(!pedido){
      res.json({
        mensaje:'Pedido no existe'
      })
      return next()
    }
    res.status(200).json({
      pedido
    })
  },
  agregarPedido:async(req,res,next) => {
    const pedido = new Pedidos(req.body)
    // console.log(req.body);
    
    try {
      await pedido.save()
      res.status(200).json({
        mensaje:'Pedido agregado'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  actualizarPedido:async(req,res,next) => {
    try {
      await Pedidos.findByIdAndUpdate(req.params.id,req.body)
      res.status(200).json({
        mensaje:'Pedido actualizado'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  eliminarPedido:async(req,res,next) => {
    try {
      await Pedidos.findByIdAndDelete(req.params.id)
      res.json({
        mensaje: 'Pedido eliminado'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  }
}