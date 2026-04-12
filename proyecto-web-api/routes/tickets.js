const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/ticketController');
router.post('/tickets', ticketCtrl.createTicket);
router.get('/tickets', ticketCtrl.getTickets);
router.patch('/tickets/:id/status', ticketCtrl.updateStatus);
router.post('/tickets/assign', ticketCtrl.assignTicket);


module.exports = router;