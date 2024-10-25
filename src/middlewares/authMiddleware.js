const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token received:", token);  // Log token for debugging

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);  // Log decoded info
      
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Not authorized, token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Not authorized, invalid token" });
      } else {
        return res.status(401).json({ message: "Not authorized, token verification failed" });
      }
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
