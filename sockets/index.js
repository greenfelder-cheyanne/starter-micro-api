const socketAuth = require("../middleware/socketAuth");

module.exports = (io) => {
  global.io = io;
  socketAuth(io);
  global.connectedUsers = new Set();

  io.on("connect", async (socket) => {
    connectedUsers.add(socket.id);
    console.log("auth-index: connectedUsers", connectedUsers);
    socket.broadcast.emit("user-online", socket.id);
    require("./auth")(socket); //compalsary module
  });
};
