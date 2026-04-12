const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
router.get('/careers', careerController.getCareers);
router.post('/careers', careerController.createCareer);
router.get('/careers/filter', careerController.filterCareers);
module.exports = router; 