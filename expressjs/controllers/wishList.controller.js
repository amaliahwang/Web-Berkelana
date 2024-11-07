const { destinationWish } = require('../models');

module.exports = {
	addToWishList: async (req, res) => {
		const { destinationId } = req.body;
		const userId = req.user.id;

		try {
			const existingWishlistItem = await destinationWish.findFirst({
				where: {
					userId: userId,
					destinationId: destinationId,
				},
			});

			if (existingWishlistItem) {
				return res.status(400).json({
					success: false,
					message: 'You have already added this destination to your wishlist',
				});
			}

			const wishlistItem = await destinationWish.create({
				data: {
					userId: userId,
					destinationId: destinationId,
				},
			});

			res.status(201).json({
				success: true,
				message: 'Destination added to wishlist',
				wishlistItem,
			});
		} catch (error) {
			console.error('Error adding to wishlist:', error);
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},

	getWishList: async (req, res) => {
		const userId = req.user.id;

		try {
			const wishlist = await destinationWish.findMany({
				where: {
					userId: userId,
				},
				include: {
					destination: true,
				},
			});

			if (wishlist.length === 0) {
				return res.status(400).json({
					success: false,
					message: 'You have not added this destination to your wishlist',
				});
			}

			res.status(200).json({
				success: true,
				message: 'Wishlist user fetch successfully',
				wishlist,
			});
		} catch (error) {
			console.error('Error fetching wishlist:', error);
			res.status(500).json({
				success: false,
				error: 'Internal server error',
			});
		}
	},

	removeFromWishList: async (req, res) => {
		const destinationId = parseInt(req.params.destinationId);

		if (isNaN(destinationId) || destinationId <= 0) {
			return res.status(400).json({
				success: false,
				message: 'Invalid destinationId',
			});
		}

		const userId = req.user.id;

		try {
			const wishlistItem = await destinationWish.findFirst({
				where: {
					userId: userId,
					destinationId: destinationId,
				},
			});

			if (!wishlistItem) {
				return res.status(400).json({
					success: false,
					message: 'You have not added this destination to your wishlist',
				});
			}

			await destinationWish.delete({
				where: {
					id: wishlistItem.id,
				},
			});

			res.status(200).json({
				success: true,
				message: 'Destination removed from wishlist',
			});
		} catch (error) {
			console.error('Error removing from wishlist:', error);
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},
};
