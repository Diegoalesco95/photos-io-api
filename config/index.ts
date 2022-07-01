import dotenv from 'dotenv';

dotenv.config();

const config = {
	port: process.env.PORT,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbUsername: process.env.DB_USERNAME,
	dbPassword: process.env.DB_PASSWORD,
	jwtSecret: process.env.JWT_SECRET,
};

export default config;
