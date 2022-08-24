const {Router} = require('express');

const hubspotPathdelete = '/hubspotDelete';
const hubspotPipelineA = '/hubspotpipeline';
const hubspotMongo = '/hubspotMongo';
const husbpotMongoSearch = '/hubspotMongoSearch';


const routerApi= (app)=>{
    app.use(hubspotPathdelete, require('../routes/hubspotDeleteC'));
    app.use(hubspotPipelineA, require('../routes/husbpotPipelineEnergiaA'));
    app.use(hubspotMongo, require('../routes/hubspotMongo'));
    app.use('/', require('../routes/hubspotMongoSearch'));
}

module.exports = routerApi;