const Clientes = require('../models/Clientes')

module.exports = { 
  listaClientes:async(req,res,next)=>{
    try {
      const clientes = await Clientes.find({})
      res.status(200).json({
        clientes
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  agregarCliente:async(req,res,next)=> {
    const cliente = new Clientes(req.body) 
    try {
      await cliente.save()
      res.status(200).json({
        mensaje:'Se agrego un nuevo cliente'
      })
    } catch (error) {
     res.send(error)
      next()
    }
  },
  queryCliente:async(req,res,next)=>{
    try {
      const cliente = await Clientes.findById(req.params.id)
      res.status(200).json({
        cliente
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  actualizarCliente:async(req,res,next) => {
    try {
      await Clientes.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        mensaje: 'Cliente actualizado'
      })
    } catch (error) {
      res.send(error)
      next()
    }
  },
  eliminarCliente:async(req,res,next)=>{
    try {
      const {id} = req.params;
      await Clientes.findByIdAndDelete(id)
      res.json({
        mensaje: 'Cliente eliminado'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  }
}