const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
app.use(express.json()); // Middleware para leer JSON
app.use('/api', userRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Programación Web corriendo en puerto ${PORT}`);
});