const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    // const jwtToken = req.headers.token
    const authHeader = req.get('Authorization')
    if (!authHeader) return res.status(401).send('Acceso Denegado. Necesitamos un token valido')

    // console.log(authHeader);
    
    // obtener el token 
    // const token = authHeader.split(' ')[1]
 
    let revisarToken
    try {
      revisarToken = jwt.verify(authHeader, process.env.SECRET_KEY)
    } catch (e) {
      res.status(400).send('Acceso Denegado. Token no valido')
    }
    // token valido p eor un error
    if(!revisarToken){
      const error = new Error('No autenticado')
      error.statusCode = 401
      throw error
    }
    next()
  }
