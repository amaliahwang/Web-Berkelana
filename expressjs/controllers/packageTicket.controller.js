const { packageTicket } = require('../models');

module.exports = {
	createPackageTicket: async (req, res) => {
		try {
			const { packageId, tickets } = req.body;

			console.log(req.body);

			// Validasi data packageId dan tickets
			if (!packageId || !tickets || !Array.isArray(tickets) || tickets.length === 0) {
				return res.status(400).json({
					success: false,
					message: 'PackageId or tickets data is missing or invalid!',
				});
			}

			// Membuat data tiket untuk paket
			const createdTickets = await packageTicket.createMany({
				data: tickets.map((ticket) => ({
					packageId: parseInt(packageId),
					availableDate: new Date(ticket.availableDate),
				})),
			});

			return res.status(201).json({
				success: true,
				message: 'Package tickets successfully created!',
				tickets: createdTickets,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error!',
			});
		}
	},

	getAllPackageTickets: async (req, res) => {
		try {
			const tickets = await packageTicket.findMany();

			return res.status(200).json({
				success: true,
				message: 'Successfully fetched package tickets',
				tickets,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Failed to fetch package tickets',
			});
		}
	},

	getPackageTicketById: async (req, res) => {
		try {
			const { ticketId } = req.params;
			const ticket = await packageTicket.findUnique({
				where: {
					id: parseInt(ticketId),
				},
			});

			if (!ticket) {
				return res.status(404).json({
					success: false,
					message: 'Package ticket not found',
				});
			}

			return res.status(200).json({
				success: true,
				message: 'Successfully fetched package ticket',
				ticket,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Failed to fetch package ticket',
			});
		}
	},

	updatePackageTicket: async (req, res) => {
		try {
			const { ticketId } = req.params;
			const { packageId, availableDate } = req.body;

			const updatedTicket = await packageTicket.update({
				where: {
					id: parseInt(ticketId),
				},
				data: {
					packageId: parseInt(packageId),
					availableDate,
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Package ticket successfully updated',
				ticket: updatedTicket,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Failed to update package ticket',
			});
		}
	},

	deletePackageTicket: async (req, res) => {
		try {
			const { ticketId } = req.params;

			await packageTicket.delete({
				where: {
					id: parseInt(ticketId),
				},
			});

			return res.status(200).json({
				success: true,
				message: 'Package ticket successfully deleted',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				success: false,
				message: 'Failed to delete package ticket',
			});
		}
	},
};
