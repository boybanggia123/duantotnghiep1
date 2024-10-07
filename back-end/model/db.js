const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "duantotnghiep";

async function connectDb() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Kết nối thành công đến server");
    return client.db(dbName);
  } catch (error) {
    console.error("Lỗi kết nối đến server:", error);
    throw error;
  }
}

module.exports = connectDb;
