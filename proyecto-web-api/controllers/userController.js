const db = require("../config/db");

// 1. Crear usuario (POST /users)
const createUser = async (req, res) => {
  const { name, last_name, username, email, password, career_id, rol } = req.body;

  // Validación: Mínimo de campos (Rúbrica: Mínimo 6 campos)
  if (!name || !last_name || !username || !email || !password || !rol) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios (mínimo 6)" });
  }

  try {
    // Validar email y username únicos (Requisito funcional 5%)
    const [existing] = await db.query(
      "SELECT id FROM Users WHERE email = ? OR username = ?", 
      [email, username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ mensaje: "El email o username ya están registrados" });
    }

    const query = `
      INSERT INTO Users (name, last_name, username, email, password, career_id, rol) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await db.query(query, [name, last_name, username, email, password, career_id, rol]);

    res.status(201).json({ mensaje: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear usuario", detalle: error.message });
  }
};

// 2. Obtener todos los usuarios (GET /users)
const getUsers = async (req, res) => {
  try {
    // La rúbrica menciona "Paginación y Ordenamiento" como extras
    const [rows] = await db.query("SELECT id, name, last_name, username, email, rol, active FROM Users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
};

// 3. Editar usuario (PUT /users/:id)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const fields = Object.keys(data);

  // Regla de rúbrica: Máximo 5 campos por solicitud
  if (fields.length > 5) {
    return res.status(400).json({ mensaje: "No puedes actualizar más de 5 campos a la vez" });
  }

  try {
    // Construcción dinámica de la consulta (solo campos enviados)
    const setQuery = fields.map(field => `${field} = ?`).join(", ");
    const values = [...Object.values(data), id];

    const query = `UPDATE Users SET ${setQuery} WHERE id = ?`;
    await db.query(query, values);

    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", detalle: error.message });
  }
};

// 4. Eliminación Lógica (PATCH /users/:id/status)
const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body; // Se envía true o false

  try {
    await db.query("UPDATE Users SET active = ? WHERE id = ?", [active, id]);
    res.json({ mensaje: `Estado del usuario actualizado a: ${active ? 'Activo' : 'Inactivo'}` });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cambiar estado" });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  changeStatus
};