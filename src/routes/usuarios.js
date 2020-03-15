const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController')

// obtener todos los Usuarios
router.get('/',UsuariosController.listaUsuarios)

// obtener un Usuario
router.get('/:id',UsuariosController.queryUsuario)

// agregar Usuarios
router.post('/',UsuariosController.agregarUsuario)

// actualizar Usuario
// router.put('/:id',UsuariosController.actualizarUsuario)

// eliminar Usuario
// router.delete('/:id',UsuariosController.eliminarUsuario)

// autentificacion
router.post('/iniciar-sesion',UsuariosController.autenticarUsuario )

module.exports = router; 