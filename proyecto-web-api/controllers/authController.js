const db = require("../config/db");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Encontrar a usuario
    const [rows] = await db.query("SELECT * FROM Users WHERE username = ?", [username]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const user = rows[0];
    //Contraseñas ++ (si se equivoca de contraseña, se añade +1 a "failed_attempts", sino se reinicia el contador)
    if (user.password === password) {
      // t odo bien
      await db.query("UPDATE Users SET failed_attempts = 0 WHERE id = ?", [user.id]);
      return res.json({ 
        mensaje: "Validación exitosa", 
        user: { id: user.id, username: user.username, rol: user.rol } 
      });
    } else {// mal
      const nuevosIntentos = user.failed_attempts + 1;
      await db.query("UPDATE Users SET failed_attempts = ? WHERE id = ?", [nuevosIntentos, user.id]);

      return res.status(401).json({ 
        mensaje: "Error de validación: contraseña incorrecta",
        intentos_fallidos: nuevosIntentos 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = {
  login
};