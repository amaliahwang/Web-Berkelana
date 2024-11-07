const express = require('express'),
	app = express(),
	port = process.env.PORT || 3001,
	cors = require('cors'),
	bodyParser = require('body-parser'),
	apiDoc = require('./documentation/api.json'),
	swaggerUi = require('swagger-ui-express'),
	router = require('./routers'),
	path = require('path');

const imagePath = path.join(__dirname, 'public', 'images');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(imagePath));

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
app.use('/api/v1', router);

app.get('*', (req, res) => {
	return res.status(501).json({
		success: false,
		error: 'This endpoint not implemented on this server! ☹. You can visit /api-docs for see any endpoints on this server.',
	});
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
