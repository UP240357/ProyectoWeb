const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { hashPassword } = require('../config/seguridad');

exports.createUser = async (req, res) => {
    const { name, last_name, username, email, password, career_id } = req.body;
    try {
        if (!email || !username || !password) return res.status(400).json({ message: "Faltan datos" });
        const [usuarioExiste] = await db.query('SELECT id FROM Users WHERE username = ?', [username]);
        if (usuarioExiste.length > 0) {
            return res.status(400).json({ message: "El nombre de usuario no es válido, elija otro nombre" });
        }
        const [existeEmail] = await db.query('SELECT id FROM Users WHERE email = ?', [email]);
        if (existeEmail.length > 0) {
            return res.status(400).json({ message: "El correo no es válido, elija otro" });
        }
        const finalPassword = await hashPassword(password);
        await db.query(
            'INSERT INTO Users (name, last_name, username, email, password, career_id) VALUES (?, ?, ?, ?, ?, ?)',
            [name, last_name, username, email, finalPassword, career_id]
        );
        res.status(201).json({ message: "Usuario creado" });
    } catch (error) {
        res.status(400).json({ message: "Error", error: error.message });
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