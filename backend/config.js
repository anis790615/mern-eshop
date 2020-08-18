import dotenv from "dotenv";

dotenv.config();
const config = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  tokenSecret: process.env.JWT_SECRET,
};
export default config;
