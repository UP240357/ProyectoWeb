const db = require('../config/db');
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
exports.getUser = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, rol, username, password, failed_attempts,  created_at,  career_id FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error en la base de datos",
      sqlError: error.message
    });
  }
};
exports.getUserById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, last_name, username, email, rol, career_id, active FROM Users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar usuario", sqlError: error.message });
    }
};
exports.filterUsers = async (req, res) => {
    const { name, email, rol } = req.query;
    let query = 'SELECT id, name, email, rol, career_id FROM Users WHERE 1=1';
    let params = [];

    if (name) { query += ' AND name LIKE ?'; params.push(`%${name}%`); }
    if (email) { query += ' AND email LIKE ?'; params.push(`%${email}%`); }
    if (rol) { query += ' AND rol = ?'; params.push(rol); }

    try {
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al filtrar usuarios", sqlError: error.message });
    }
};
exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body; // boolean 1 o 0
    try {
        await db.query('UPDATE Users SET active = ? WHERE id = ?', [active, id]);
        res.json({ message: "Estado de usuario actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar estado" });
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
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Users SET active = 0 WHERE id = ?', [id]);
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};
