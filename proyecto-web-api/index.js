const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const ticketRoutes = require('./routes/tickets');
const careersRoutes = require('./routes/career');
const authRoutes = require('./routes/auth');
const typeRoutes = require('./routes/type');
app.use(express.json());
app.use('/api', userRoutes);  
app.use('/api', ticketRoutes);
app.use('/api', careersRoutes);
app.use('/api', authRoutes);
app.use('/api', typeRoutes);
app.use((req, res) => {
    res.status(404).json({ message: "La ruta solicitada no existe" });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Programación Web corriendo en puerto ${PORT}`);
});