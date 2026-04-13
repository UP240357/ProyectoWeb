const db = require('../config/db');
exports.createTicket = async (req, res) => {
    const { title, description, type_id, priority, created_by } = req.body;
    const [typeExists] = await db.query('SELECT id FROM Types WHERE id = ?', [type_id]);
    if (typeExists.length === 0) {
        return res.status(400).json({ message: "El tipo de ticket especificado no existe" });
    }
    try {
        if (!title || !description || !type_id || !created_by) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await db.query(
            'INSERT INTO Tickets (title, description, type_id, priority, created_by) VALUES (?, ?, ?, ?, ?)',
            [title, description, type_id, priority, created_by]
        );
        res.status(201).json({ message: "Ticket creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear ticket", sqlError: error.message });
    }
};
exports.getTickets = async (req, res) => {
    const { status, priority, type_id, user_id } = req.query;
    let query = 'SELECT * FROM Tickets WHERE 1=1';
    let params = [];
    if (status) { query += ' AND status = ?'; params.push(status); }
    if (priority) { query += ' AND priority = ?'; params.push(priority); }
    if (type_id) { query += ' AND type_id = ?'; params.push(type_id); }
    if (user_id) { query += ' AND created_by = ?'; params.push(user_id); }
    try {
        const [rows] = await db.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al consultar tickets" });
    }
};
exports.getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Tickets WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Ticket no encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al consultar ticket" });
    }
};
exports.filterTickets = async (req, res) => {
  const { status, priority, type_id, user_id, title } = req.query; // Extraemos todos
  let query = 'SELECT * FROM Tickets WHERE 1=1';
  let params = [];

  if (title) { 
    query += ' AND title LIKE ?'; 
    params.push(`%${title}%`); 
  }
  if (status) { 
    query += ' AND status = ?'; 
    params.push(status); 
  }
  if (priority) { 
    query += ' AND priority = ?'; 
    params.push(priority); 
  }
  if (type_id) { 
    query += ' AND type_id = ?'; 
    params.push(type_id); 
  }
  if (user_id) { 
    query += ' AND created_by = ?'; 
    params.push(user_id); 
  }

  try {
    const [rows] = await db.query(query, params);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron tickets con esos criterios" });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al filtrar tickets", error: error.message });
  }
};
exports.getTicketsByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Tickets WHERE created_by = ?', [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al consultar los tickets del usuario" });
    }
};
exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority } = req.body;
    try {
        await db.query('UPDATE Tickets SET title = ?, description = ?, priority = ? WHERE id = ?', [title, description, priority, id]);
        res.json({ message: "Ticket actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar ticket" });
    }
};
// Cambiar estado (open, in_progress, closed) 
exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // open, in_progress, closed
    try {
        await db.query('UPDATE Tickets SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: "Estado actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};
// Asignar ticket a un desarrollador
exports.assignTicket = async (req, res) => {
    const { id_ticket, id_user } = req.body;
    try {
        const [userRows] = await db.query('SELECT rol FROM Users WHERE id = ?', [id_user]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (userRows[0].rol !== 'dev') {
            return res.status(403).json({ 
                message: "Error de asignación: Solo los usuarios con rol 'dev' pueden recibir tickets" 
            });
        }
        await db.query('INSERT INTO Tickets_Devs (id_ticket, id_user) VALUES (?, ?)', [id_ticket, id_user]);
        res.status(201).json({ message: "Ticket asignado al desarrollador exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", detalle: error.message });
    }
};
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Tickets WHERE id = ?', [id]);
        res.json({ message: "Ticket eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar ticket" });
    }
};