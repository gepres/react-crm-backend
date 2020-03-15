const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/PedidosController')
const auth = require('../middleware/auth')

// obtener todos los pedidos
router.get('/',auth,PedidosController.listaPedidos)

// obtener un pedido
router.get('/:id',PedidosController.queryPedido)

// agregar pedidos
router.post('/:id',PedidosController.agregarPedido)

// actualizar pedido
router.put('/:id',PedidosController.actualizarPedido)

// eliminar pedido
router.delete('/:id',PedidosController.eliminarPedido)

module.exports = router; 