import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

const token = jwt.sign(
  { app: "nodejs-api" },
  process.env.API_JWT_SECRET,
  { expiresIn: "365d" } // long-lived
);

console.log("API TOKEN:", token);
