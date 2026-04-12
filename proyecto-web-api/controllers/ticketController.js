const db = require('../config/db');
// Crear ticket
exports.createTicket = async (req, res) => {
    try {
        const { title, description, type_id, priority, created_by } = req.body;
        await db.query(
            'INSERT INTO Tickets (title, description, type_id, priority, created_by) VALUES (?, ?, ?, ?, ?)',
            [title, description, type_id, priority, created_by]
        );
        res.status(201).json({ message: 'Ticket creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Filtros de tickets
exports.filterTickets = async (req, res) => {
    try {
        const { status, priority, type_id, user_id } = req.query;
        let query = 'SELECT * FROM Tickets WHERE 1=1';
        let params = [];
        if (status) { query += ' AND status = ?'; params.push(status); }
        if (priority) { query += ' AND priority = ?'; params.push(priority); }
        if (type_id) { query += ' AND type_id = ?'; params.push(type_id); }
        if (user_id) { query += ' AND created_by = ?'; params.push(user_id); }
        const [tickets] = await db.query(query, params);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Asignar ticket a desarrollador 
exports.assignTicket = async (req, res) => {
    try {
        const { id_ticket, id_user } = req.body;
        await db.query('INSERT INTO Tickets_Devs (id_ticket, id_user) VALUES (?, ?)', [id_ticket, id_user]);
        res.status(201).json({ message: 'Ticket asignado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// KPI: Tickets por estado
exports.kpiStatus = async (req, res) => {
    try {
        const [kpi] = await db.query('SELECT status, COUNT(*) as total FROM Tickets GROUP BY status');
        res.status(200).json(kpi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};