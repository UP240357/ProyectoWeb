const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/filter', ticketController.filterTickets);
router.get('/:id', ticketController.getTicketById);
router.put('/:id', ticketController.updateTicket);
router.patch('/:id/status', ticketController.updateStatus);
router.delete('/:id', ticketController.deleteTicket);
router.post('/assign', ticketController.assignTicket);
router.get('/user/:id', ticketController.getTicketsByUser);

module.exports = router;