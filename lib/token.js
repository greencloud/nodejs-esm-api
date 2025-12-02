import jwt from "jsonwebtoken";
import { API_JWT_SECRET, API_JWT_EXPIRY } from "../config/env.js";

export const issueFrontendToken = () => {
  return jwt.sign(
    { service: "frontend-app" },
    API_JWT_SECRET,
    { expiresIn: API_JWT_EXPIRY }
  );
};
