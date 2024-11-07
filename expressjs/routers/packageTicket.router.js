const express = require('express'),
	router = express.Router(),
	multer = require('../middlewares/multer'),
	packageTicketController = require('../controllers/packageTicket.controller');

router.get('/', packageTicketController.getAllPackageTickets);
router.post('/', packageTicketController.createPackageTicket);

module.exports = router;
