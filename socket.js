const { Server } = require("socket.io");

const sockets = require("./sockets");

module.exports = (server, port) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.URL
          : `http://localhost:${port}`,
      methods: ["GET", "POST"],
    },
  });
  sockets(io);
};
