const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION);
		console.log('Database connection bien');
	} catch (error) {
		throw new Error('Error database');
	}
};

module.exports = { dbConnection };
