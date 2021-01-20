import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;
const SERVER_HOSTNAME = process.env.HOSTNAME || 'http://localhost';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const DATABASE = {
  connectionString: process.env.DB_CONNECTION || '',
};

const config = {
  server: SERVER,
  database: DATABASE,
};

export default config;
