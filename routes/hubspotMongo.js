const {Router} = require('express');
const { hubspotMongoGet, hubspotMongoPost, hubspotMongoPut } = require('../controller/hubspotMongo.controller');


const router = Router();

router.get('/', hubspotMongoGet);

router.post('/', hubspotMongoPost);

router.put('/', hubspotMongoPut);


module.exports = router;