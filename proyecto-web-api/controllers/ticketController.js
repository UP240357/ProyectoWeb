const db = require('../config/db');
exports.createTicket = async (req, res) => {
    const { title, description, type_id, priority, created_by } = req.body;
    try {
        if (!title || !description || !type_id || !created_by) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await db.query(
            'INSERT INTO Tickets (title, description, type_id, priority, created_by) VALUES (?, ?, ?, ?, ?)',
            [title, description, type_id, priority, created_by]
        );
        res.status(201).json({ message: "Ticket creado exitosamente" }); [cite: 205]
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
        await db.query('INSERT INTO Tickets_Devs (id_ticket, id_user) VALUES (?, ?)', [id_ticket, id_user]);
        res.status(201).json({ message: "Ticket asignado al desarrollador" });
    } catch (error) {
        res.status(400).json({ message: "Error en la asignación" });
    }
};