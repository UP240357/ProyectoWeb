const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
router.post('/tickets', ticketController.createTicket); // [cite: 156]
router.get('/tickets', ticketController.getTickets); // [cite: 159]
router.get('/tickets/filter', ticketController.getTickets); // Reutiliza la lógica de filtros dinámicos [cite: 176]
router.get('/tickets/:id', ticketController.getTicketById); // [cite: 173]
router.put('/tickets/:id', ticketController.updateTicket); // [cite: 178]
router.patch('/tickets/:id/status', ticketController.updateStatus); // [cite: 180]
router.delete('/tickets/:id', ticketController.deleteTicket); // [cite: 182]
router.post('/tickets/assign', ticketController.assignTicket); // [cite: 183]
router.get('/tickets/user/:id', ticketController.getTicketsByUser); // [cite: 186]

module.exports = router;