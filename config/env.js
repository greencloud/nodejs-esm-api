import dotenv from "dotenv";
dotenv.config();

export const API_JWT_SECRET = process.env.API_JWT_SECRET;
export const API_JWT_EXPIRY = process.env.API_JWT_EXPIRY || "5m";
