//===========================================================================
//PAQUETES EXTERNOS
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/routesGeneral');
require('dotenv').config();

//===========================================================================
//RUTAS INTERNAS



const port = process.env.PORT;

//===========================================================================
//EXPRESS
app = express();

//===========================================================================
//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

//===========================================================================
//ROUTES

routerApi(app)

//===========================================================================
//PORT
app.listen(port, ()=>{
    console.log('listen in port '+port);
})