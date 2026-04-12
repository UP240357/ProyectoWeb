const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
router.post('/auth/login', authController.login);
router.post('/users', userController.createUser);
router.put('/users', userController.createUser);
router.get('/users', userController.getUser);
router.get('/users/:id', userController.getUserById);
router.get('/users/filter', userController.filterUsers);
router.put('/users/:id', userController.updateUser);
router.patch('/users/:id/status', userController.updateStatus);
router.delete('/users/:id', userController.deleteUser)
/*
router.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, rol, username, password, failed_attempts,  created_at,  career_id FROM Users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en la base de datos",
            sqlError: error.message
        });
    }
});
*/
module.exports = router;