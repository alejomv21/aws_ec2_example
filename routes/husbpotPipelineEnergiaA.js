const {Router} = require('express');
const { husbpotPipelineEnergiaGET, husbpotPipelineEnergiaPOST, husbpotPipelineEnergiaPUT } = require('../controller/husbpotPipelineEnergiaA.controller');


const router = Router();

router.get('/', husbpotPipelineEnergiaGET);

router.post('/', husbpotPipelineEnergiaPOST);

router.put('/', husbpotPipelineEnergiaPUT);


module.exports = router;