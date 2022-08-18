//===========================================================================
//PAQUETES EXTERNOS
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//===========================================================================
//RUTAS INTERNAS
const hubspotPathdelete = '/hubspotDelete';
const hubspotPipelineA = '/hubspotpipeline';
const hubspotMongo = '/hubspotMongo';
const husbpotMongoSearch = '/hubspotMongoSearch';


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
app.use(hubspotPathdelete, require('./routes/hubspotDeleteC'));
app.use(hubspotPipelineA, require('./routes/husbpotPipelineEnergiaA'));
app.use(hubspotMongo, require('./routes/hubspotMongo'));
app.use('/', require('./routes/hubspotMongoSearch'));

//===========================================================================
//PORT
app.listen(port, ()=>{
    console.log('listen in port '+port);
})