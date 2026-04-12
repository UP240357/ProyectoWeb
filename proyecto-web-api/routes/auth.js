const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
console.log("¿Qué hay en authController?:", authController);
router.post('/login', authController.login);
router.get('/profile', authController.getProfile); 
module.exports = router;