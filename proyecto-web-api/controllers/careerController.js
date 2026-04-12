const db = require('../config/db');
exports.createCareer = async (req, res) => {
    const { name, active } = req.body;
    try {
        if (!name) return res.status(400).json({ message: "El nombre es obligatorio" });

        await db.query('INSERT INTO Careers (name, active) VALUES (?, ?)', [name, active]);
        res.status(201).json({ message: "Carrera creada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la carrera", sqlError: error.message });
    }
};
exports.getCareers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Careers WHERE active = 1');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener carreras" });
    }
};
exports.filterCareers = async (req, res) => {
    const { name } = req.query;
    try {
        const [rows] = await db.query('SELECT * FROM Careers WHERE name LIKE ?', [`%${name}%`]);
        res.json(rows);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.updateCareer = async (req, res) => {
    const { id } = req.params;
    const { name, active } = req.body;
    try {
        await db.query('UPDATE Careers SET name = ?, active = ? WHERE id = ?', [name, active, id]);
        res.json({ message: "Carrera actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la carrera" });
    }
};
exports.deleteCareer = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Careers SET active = 0 WHERE id = ?', [id]);
        res.json({ message: "Carrera eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la carrera" });
    }
};
