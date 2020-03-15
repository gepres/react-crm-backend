const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/ProductosController')
const auth = require('../middleware/auth')
// obtener todos los productos
router.get('/', auth,ProductosController.listaProductos)

// agregar un productos
router.post('/',ProductosController.subirImagen,ProductosController.agregarProducto)

// obtener un producto
router.get('/:id', ProductosController.queryProducto)

// busqueda de productos
router.get('/busqueda/:query',ProductosController.buscarProducto)

// actualizar un producto
router.put('/:id',ProductosController.subirImagen,ProductosController.actualizarProducto)

// eliminar un producto
router.delete('/:id',ProductosController.eliminarProducto)

module.exports = router; 