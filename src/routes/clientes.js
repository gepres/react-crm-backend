const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/ClientesController')
const auth = require('../middleware/auth')

// obtener todos los cliente
router.get('/',auth, ClientesController.listaClientes)

// agregar un cliente
router.post('/',ClientesController.agregarCliente)

// obtener un cliente
router.get('/:id',ClientesController.queryCliente)

// Actualizar un cliente
router.put('/:id',ClientesController.actualizarCliente)

// ELiminar un cliente
router.delete('/:id',ClientesController.eliminarCliente)

module.exports = router; 