const db = require('../config/db');
const bcrypt = require('bcryptjs');
exports.createUser = async (req, res) => {
    const { name, last_name, username, email, password, career_id } = req.body;
    try {
        if (!email || !username || !password) return res.status(400).json({ message: "Faltan datos" });
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO Users (name, last_name, username, email, password, career_id) VALUES (?, ?, ?, ?, ?, ?)',
            [name, last_name, username, email, hashedPassword, career_id]
        );
        res.status(201).json({ message: "Usuario creado" });
    } catch (error) {
        res.status(400).json({ message: "Email o Username ya existen" });
    }
};
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    if (Object.keys(fields).length > 5) {
        return res.status(400).json({ message: "Máximo 5 campos permitidos" });
    }
    try {
        await db.query('UPDATE Users SET ? WHERE id = ?', [fields, id]);
        res.status(200).json({ message: "Usuario actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar" });
    }
};