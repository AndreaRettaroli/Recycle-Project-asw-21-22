const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1]; //split Bearer from token

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY, { maxAge: "8h" });
    req.user = decoded;
  } catch (err) {
    console.error("🚀 ~ file: auth.js:21 ~ verifyToken ~ err:", err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
