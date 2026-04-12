const db = require('../config/db');
exports.getTicketsByStatus = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT status, COUNT(*) as total FROM Tickets GROUP BY status');
        res.json(rows); // [cite: 189]
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.getTicketsByUser = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT u.username, COUNT(t.id) as total_tickets FROM Users u LEFT JOIN Tickets t ON u.id = t.created_by GROUP BY u.id'
        );
        res.json(rows); // [cite: 191]
    } catch (error) {
        res.status(500).send(error);
    }
};