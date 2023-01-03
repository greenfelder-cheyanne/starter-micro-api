const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.user.id }).select("-password");
  return user;
};
