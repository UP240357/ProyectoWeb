const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const ticketRoutes = require('./routes/tickets');
const careersRoutes = require('./routes/career');
const authRoutes = require('./routes/auth');

app.use(express.json()); // Middleware para leer JSON
app.use('/api', userRoutes);
app.use("/api", ticketRoutes);
app.use("/api", careersRoutes);
app.use("/api", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Programación Web corriendo en puerto ${PORT}`);
});