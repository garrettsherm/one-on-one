const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController'); 

router.get('/', apiController.apiMain);

module.exports = router;
