const {Router} = require('express');
const { hubspotdeletePut, hubspotdeleteGet, hubspotdeletePost } = require('../controller/hubspotDelete.controller');


const router = Router();

router.get('/', hubspotdeleteGet);

router.post('/', hubspotdeletePost);

router.put('/', hubspotdeletePut);


module.exports = router;