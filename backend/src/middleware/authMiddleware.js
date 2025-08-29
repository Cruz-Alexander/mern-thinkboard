import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  // Grab token from "Authorization" header → format: "Bearer <token>"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request (so controllers can use req.user.id)
    req.user = decoded;
    next(); // continue to route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(400).json({ message: "Invalid token" });
  }
}
