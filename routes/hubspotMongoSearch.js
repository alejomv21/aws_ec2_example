const {Router} = require('express');
const { hubspotMongoSearchGet, hubspotMongoSearchPost, hubspotMongoSearchPut } = require('../controller/hubspotMongoSearch.controller');


const router = Router();

router.get('/', hubspotMongoSearchGet);

router.post('/', hubspotMongoSearchPost);

router.put('/', hubspotMongoSearchPut);


module.exports = router;