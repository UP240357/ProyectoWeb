const express = require('express');
const router = express.Router();
const typeCategoryController = require('../controllers/typeCat');
router.get('/types', typeCategoryController.getTypes);
router.post('/types', typeCategoryController.createType);
router.put('/types/:id', typeCategoryController.updateType);
router.delete('/types/:id', typeCategoryController.deleteType);
//
router.get('/categories', typeCategoryController.getCategories);
module.exports = router;