const Productos = require('../models/Productos')
const multer = require('multer')
const shortid = require('shortid')
const cloudinary = require('cloudinary')
const fs = require('fs-extra');

const configuracionMulter = {
  limits:{fileSize:2000000},
  storage:fileStorage = multer.diskStorage({
    destination:(req,file,next) => {
      next(null, __dirname + '/../public/uploads/productos/')
    },
    filename: (req,file,next) => {
      const extension = file.mimetype.split('/')[1];
      next(null,`${shortid.generate()}.${extension}`)
    }
  }),
  fileFilter(req,file,next){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      // el callback se ejecuta como tue o false | true cuando la imagen se acepta
      next(null,true)
    }else{
      next(new Error('Ese formato no es valido'),false)
    }
  }
}
const upload = multer(configuracionMulter).single('imagen');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = {
  subirImagen:(req,res,next) => {
    upload(req,res, function(error){
      if(error){
        res.json({
          mensaje:error
        })
      }
      return next()
    })
  },
  listaProductos:async(req,res,next)=>{
    try {
      const productos = await Productos.find({})
      res.status(200).json({
        productos
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  agregarProducto:async(req,res,next) => {
    const producto = new Productos(req.body) 
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path,{
        folder: 'react-dash/productos'
      });

      // si hay una imagen nueva , la guardamos
      if(req.file){
        producto.imagen = result.url;
        producto.public_id = result.public_id
      }

      await producto.save()
      await fs.unlink(req.file.path)
      res.status(200).json({
        mensaje:'Se agrego un nuevo Producto'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  queryProducto:async(req,res,next) => {
    try {
      const producto = await Productos.findById(req.params.id)
      if(!producto){
        res.json({
          mensaje:'Ese Producto no existe'
        })
        return next()
      }
      res.status(200).json({
        producto
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  buscarProducto:async (req,res,next) => {
    try {
      const {query} = req.params
  
      const producto = await Productos.find({nombre: new RegExp(query,'i')})
      res.status(200).json({
        producto
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  actualizarProducto:async(req,res,next) => {
    try {
      let productoAnterior = await Productos.findById(req.params.id)
      
      // construir un nuevo producto
      let nuevoProducto = req.body
      // verificar si hay imagen nueva
      if(req.file){
        let result = await cloudinary.v2.uploader.upload(req.file.path,{
          folder: 'react-dash/productos'
        });
        await cloudinary.v2.uploader.destroy(productoAnterior.public_id)
        nuevoProducto.imagen = result.url
        nuevoProducto.public_id = result.public_id
        await fs.unlink(req.file.path)
      }

      await Productos.findOneAndUpdate({_id:req.params.id},nuevoProducto)
      res.status(200).json({
        mensaje:'Producto Actualizado'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  },
  eliminarProducto:async(req,res,next) => {
    try {
      const producto = await Productos.findByIdAndDelete(req.params.id)
      if(!producto){
        res.json({
          mensaje:'Ese Producto no existe'
        })
        return next()
      }
      await cloudinary.v2.uploader.destroy(producto.public_id)
      res.status(200).json({
        mensaje:'Producto Eliminado'
      })
    } catch (error) {
      console.log(error);
      next()
    }
  }
}