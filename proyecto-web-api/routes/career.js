const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
router.get('/careers', careerController.getCareers);
router.get('/careers/filter', careerController.filterCareers);
module.exports = router; 