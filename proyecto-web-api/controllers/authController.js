const { comparePassword } = require('../config/seguridad');

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
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        res.status(200).json({ message: "Login exitoso" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};