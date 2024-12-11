const { createClient } = require('redis');
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');

// Tạo Redis clients mới cho pub/sub
const pubClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

const subClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

let io;
async function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  try {
    await Promise.all([pubClient.connect(), subClient.connect()]);

    // Sử dụng Redis Adapter cho Socket.IO
    io.adapter(createAdapter(pubClient, subClient));
    console.log("Socket.IO with Redis adapter initialized.");
  } catch (error) {
    console.error("Error initializing Redis connection:", error.message);
    throw error;
  }

  require("./events")(io); // Định nghĩa các sự kiện
  return io;
}

function getIo() {
  if (!io) {
    throw new Error("Socket.IO is not initialized yet");
  }
  return io;
}

module.exports = { setupSocket,getIo };
