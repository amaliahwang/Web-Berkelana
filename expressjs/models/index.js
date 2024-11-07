const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
	users: prisma.User,
	profiles: prisma.Profile,
	categoriesdestination: prisma.CategoryDestination,
	subscriptions: prisma.Subscription,
	destinations: prisma.Destination,
	galleriesdestinations: prisma.GaleryDestination,
	galleriesPackage: prisma.GaleryPackage,
	destinationPackage: prisma.DestinationPackage,
	destinationPackageDestination: prisma.DestinationPackageDestination,
	destinationWish: prisma.Wishlist,
	promos: prisma.Promo,
	paymentMethods: prisma.PaymentMethod,
	payments: prisma.Payment,
};
