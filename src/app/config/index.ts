import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from a .env file located at the root of the project
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Export configuration values sourced from environment variables
export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
