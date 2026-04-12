const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/ticketController');
const kpiCtrl = require('../controllers/kpiController');
router.post('/tickets', ticketCtrl.createTicket);
router.get('/tickets', ticketCtrl.getTickets);
router.patch('/tickets/:id/status', ticketCtrl.updateStatus);
router.post('/tickets/assign', ticketCtrl.assignTicket);
router.get('/kpi/tickets/status', kpiCtrl.getTicketsByStatus);
router.get('/kpi/tickets/user', kpiCtrl.getTicketsByUser);

module.exports = router;