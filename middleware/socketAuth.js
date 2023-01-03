const getUserFromToken = require("../func/auth/getUserFromToken");

module.exports = (io) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.headers.cookie;
    try {
      const user = await getUserFromToken(token);
      if (user) {
        socket.data = user;
        socket.id = user.username;
        next();
      } else {
        next(new Error("Invalid token"));
      }
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });
};
