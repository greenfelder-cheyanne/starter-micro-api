module.exports = (socket) => {
  require("./online")(socket);
  require("./disconnect")(socket);
};
