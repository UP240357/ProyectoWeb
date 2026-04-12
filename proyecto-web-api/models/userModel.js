const db = require("../config/db");

const User = {
  // Buscar por username (para el Login)
  findByUsername: async (username) => {
    const [rows] = await db.query("SELECT * FROM Users WHERE username = ?", [username]);
    return rows[0];
  },

  // Crear nuevo usuario
  create: async (userData) => {
    const { name, last_name, username, email, password, career_id, rol } = userData;
    const query = `
      INSERT INTO Users (name, last_name, username, email, password, career_id, rol) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [name, last_name, username, email, password, career_id, rol]);
    return result;
  },

  // Obtener todos los usuarios
  getAll: async () => {
    const [rows] = await db.query("SELECT id, name, last_name, username, email, rol, active FROM Users");
    return rows;
  },

  // Actualizar intentos fallidos (Punto clave de la rúbrica)
  updateAttempts: async (id, attempts) => {
    return await db.query("UPDATE Users SET failed_attempts = ? WHERE id = ?", [attempts, id]);
  },

  // Actualización dinámica (máximo 5 campos según rúbrica)
  update: async (id, fields, values) => {
    const setQuery = fields.map(field => `${field} = ?`).join(", ");
    const query = `UPDATE Users SET ${setQuery} WHERE id = ?`;
    return await db.query(query, [...values, id]);
  },

  // Cambio de estado (Eliminación lógica recomendada)
  setStatus: async (id, active) => {
    return await db.query("UPDATE Users SET active = ? WHERE id = ?", [active, id]);
  }
};

module.exports = User;