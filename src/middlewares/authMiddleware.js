const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user ID from token to req.user
      req.user = { id: decoded.id };

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Not authorized, token expired" });
      } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Not authorized, invalid token" });
      } else {
        res.status(401).json({ message: "Not authorized, token verification failed" });
      }
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
