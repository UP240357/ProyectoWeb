const { comparePassword } = require('../config/seguridad');
const db = require('../config/db');
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user || user.active === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        const validPass = await comparePassword(password, user.password);
        if (!validPass) {
            await db.query('UPDATE Users SET failed_attempts = failed_attempts + 1 WHERE id = ?', [user.id]);
            if (user.failed_attempts + 1 >= 5) {
                await db.query('UPDATE Users SET active = 0 WHERE id = ?', [user.id]);
                return res.status(401).json({ message: "Cuenta bloqueada por demasiados intentos fallidos" });
            }
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        res.status(200).json({ message: "Login exitoso" });
        await db.query('UPDATE Users SET failed_attempts = 0 WHERE id = ?', [user.id]);
    } catch (error) {
        res.status(500).json({ message: "Error", detalle: error.message});
    }
};
exports.getProfile = async (req, res) => {
    const id = req.query.id || req.body.id; 
    try {
        const [rows] = await db.query('SELECT id, name, last_name, username, email, career_id, rol, active FROM Users WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Perfil no encontrado" });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil", sqlError: error.message });
    }
};