const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
router.post('/auth/login', authController.login);
router.post('/users', userController.createUser);
router.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, rol FROM Users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en la base de datos" });
    }
});
module.exports = router;