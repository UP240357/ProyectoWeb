const db = require('../config/db');
const bcrypt = require('bcryptjs');
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user || user.active === 0) {
            return res.status(401).json({ message: "Usuario no encontrado o inactivo" });
        }
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            await db.query('UPDATE Users SET failed_attempts = failed_attempts + 1 WHERE id = ?', [user.id]);
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        await db.query('UPDATE Users SET failed_attempts = 0 WHERE id = ?', [user.id]);
        res.status(200).json({ message: "Login exitoso", user: { id: user.id, rol: user.rol } });
        
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};
exports.login = async (req, res) => {
    res.send("Login funcional");
};

exports.getProfile = async (req, res) => {
    res.send("Perfil del usuario");
};