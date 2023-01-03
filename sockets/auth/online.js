module.exports = (socket) => {
  socket.on("online", (userId) => {
    socket.emit("online", connectedUsers.has(userId) ? true : false); //need to convert to callback func from device side to know which userId is in the context
  });
};
