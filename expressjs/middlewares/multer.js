const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const filename = (req, file, callback) => {
	const ext = file.originalname.split('.').pop();
	const fileName = `thumbs-${uuidv4()}.${ext}`;
	callback(null, fileName);
};

const generateStore = (destination) => {
	return multer.diskStorage({
		destination: (req, file, callback) => {
			fs.mkdir(destination, { recursive: true }, (err) => {
				if (err) {
					console.error('Error creating directory:', err);
				}
				callback(null, destination);
			});
		},
		filename,
	});
};

module.exports = {
	thumbnailCategoryBlog: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'category_blog')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	thumbnailCategoryDestination: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'category_destination')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	thumbnailDestination: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'destination')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	galleryImageDestination: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'gallery_destination')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	thumbnailDestinationPackage: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'destination_package')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	galleryPackageDestination: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'gallery_package')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	thumbnailPromo: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'promo')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	thumbnailPaymentMethod: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'thumbnail_payment_methods')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),

	paymentProofImage: multer({
		storage: generateStore(path.join(__dirname, '../', 'public', 'images', 'payment_proof')),
		fileFilter: (req, file, callback) => {
			const allowed = ['image/png', 'image/jpg', 'image/jpeg'];

			if (allowed.includes(file.mimetype)) {
				callback(null, true);
			} else {
				const err = new Error(`Only ${allowed.join(', ')} are allowed to upload`);
				err.status = 400;
				callback(err);
			}
		},
	}),
};
