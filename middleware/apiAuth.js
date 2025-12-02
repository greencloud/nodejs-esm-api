import jwt from "jsonwebtoken";

export default function apiAuth(req, res, next) {
  // Allow direct browser access during development
  const allowedHosts = ["localhost", "127.0.0.1"];
  const host = req.hostname;

  if (allowedHosts.includes(host) && process.env.SKIP_JWT_VALIDATION === "true") {
    return next();
  }

  // Leave this for the live environment
  const token = req.headers["x-api-jwt"];
  if (!token) {
    return res.status(401).json({ error: "Missing API token" });
  }

  try {
    const payload = jwt.verify(token, process.env.API_JWT_SECRET);
    req.appAuth = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid API token" });
  }
}
