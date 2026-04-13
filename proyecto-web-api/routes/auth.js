const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
router.post('/login', authController.login);
router.get('/auth/profile/:id', authController.getProfile);
module.exports = router;