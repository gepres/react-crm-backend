const express = require('express');
const cors = require('cors')
const morgan = require('morgan')


// Initializations
const app = express();
require('./database');

// definir un dominio para recibir peticiones
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
  origin :(origin,callback) => {
    // console.log(origin);
    
    // revisar si la peticion viene de un servidor q esta en la whitelist
    const existe = whitelist.some( dominio => dominio === origin)
    if(existe){
      callback(null,true)
    }else{
      callback(new Error('no permitido por Cors'))
    }
  }
}
app.use(cors(corsOptions))

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// routes
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/clientes', require('./routes/clientes'))
app.use('/api/productos', require('./routes/productos'))
app.use('/api/pedidos', require('./routes/pedidos'))

module.exports = app;
