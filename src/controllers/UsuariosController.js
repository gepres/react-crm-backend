const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  listaUsuarios:async (req,res) => {
    try {
      const usuarios = await Usuarios.find({})
      res.status(200).json({
        usuarios
      })
    } catch (error) {
      console.log(error)
    }
  },
  queryUsuario:async(req,res) => {
    try {
      const usuario = await Usuarios.findById(req.params.id)
      res.status(200).json({
        usuario
      })
    } catch (error) {
      console.log(error)
    }
  },
  agregarUsuario:async(req,res) => {
    try {
      // leer los datos del usuarios
      const usuario = new Usuarios(req.body);
      // validar si el email ya existe
      let validarEmail = await Usuarios.findOne({email: req.body.email}) 
      if (validarEmail) {
        return res.status(400).send('El usuario ya existe')
      }
      // encriptación de contraseña
      const salt  = await bcrypt.genSalt(10)
      usuario.password = await bcrypt.hash(req.body.password, salt)
      await usuario.save();
      res.json({
        mensaje:'Usuario Creado Correctamente'
      })
    } catch (error) {
      console.log(error);
      res.json({mensaje:'Hubo un error'})
    }
  },
  autenticarUsuario:async (req,res,next) => {
    const usuario = await Usuarios.findOne({email:req.body.email})
    if(!usuario){
      // usuario no existe
      res.status(401).json({
        mensaje:'El usuario no existe'
      })
      next()
    }

    // validar la contraseña encriptada con la base de datos
    const validPassword = await bcrypt.compare(req.body.password, usuario.password)
    if(!validPassword){
      res.status(401).json({
        mensaje:'contraseña incorrecta'
      })
      next()
    }
    
    // usuario y pass correcto firmar el token
    const token = jwt.sign({_id:usuario._id,name:usuario.name,email:usuario.email},process.env.SECRET_KEY,{expiresIn:'1h'})

    // return el token 
    res.status(200).json({
      mensaje:'usuario ingresado',
      token
    })
  }
}