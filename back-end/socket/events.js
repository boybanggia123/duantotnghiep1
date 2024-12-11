module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
  
      // Lắng nghe sự kiện từ client
      socket.on("message", (data) => {
        console.log("Received message:", data);
        io.emit("message", data); // Phát sự kiện tới toàn bộ client
      });
  
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };
  