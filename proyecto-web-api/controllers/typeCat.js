const db = require('../config/db');
exports.getTypes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Types');
        res.json(rows);
    } catch (error) { res.status(500).json({ message: "Error al obtener tipos" }); }
};
exports.createType = async (req, res) => {
    const { type, description, area } = req.body;
    try {
        await db.query('INSERT INTO Types (type, description, area) VALUES (?, ?, ?)', [type, description, area]);
        res.status(201).json({ message: "Tipo creado" });
    } catch (error) { res.status(500).json({ message: "Error al crear tipo" }); }
};
exports.updateType = async (req, res) => {
    const { id } = req.params;
    const { type, description, area } = req.body;
    try {
        await db.query('UPDATE Types SET type = ?, description = ?, area = ? WHERE id = ?', [type, description, area, id]);
        res.json({ message: "Tipo actualizado" });
    } catch (error) { res.status(500).json({ message: "Error al actualizar tipo" }); }
};
exports.deleteType = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Types WHERE id = ?', [id]);
        res.json({ message: "Tipo eliminado" });
    } catch (error) { res.status(500).json({ message: "Error al eliminar tipo" }); }
};
exports.getCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Categorías'); 
        res.json(rows);
    } catch (error) { res.status(500).json({ message: "Error al obtener categorías" }); }
};