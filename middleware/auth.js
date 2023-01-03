const getUserFromToken = require("../functions/auth/getUserFromToken");

module.exports = async (req, res, next) => {
  try {
    if (
      req.originalUrl !== "/chat/auth/login" &&
      req.originalUrl !== "/chat/auth/register"
    ) {
      const token = req.header("X-Auth-Token") || req.query?.token;

      if (!token) {
        return res.status(400).json({ message: "No token" });
      }

      const user = await getUserFromToken(token);
      req.body.user = user;

      return user ? next() : res.status(401).json({ message: "Unauthorized" });
    } else next();
  } catch (err) {
    console.log(err.message, req.originalUrl);

    if (err.message == "invalid token") {
      return res.status(400).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
