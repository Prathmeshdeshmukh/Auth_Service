const express= require('express');
const Apiv1Routes = require('./v1/index');
const router = express.Router();


router.use('/v1' , Apiv1Routes);

module.exports = router;

