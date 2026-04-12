const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
router.post('/auth/login', authController.login);
router.post('/users', userController.createUser);
router.get('/users', async (req, res) => {
    const [rows] = await db.query('SELECT id, name, email, rol FROM Users');
    res.json(rows);
});
router.put('/users/:id', userController.updateUser);

module.exports = router;