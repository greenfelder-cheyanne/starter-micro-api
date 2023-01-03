module.exports = (socket) => {
  socket.on("disconnect", () => {
    console.log("auth-disconnect: user disconnected", socket.id);
    connectedUsers.delete(socket.id);
    io.emit("offline", {
      userId: socket.id,
    });
  });
};
