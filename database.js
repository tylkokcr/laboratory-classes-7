const { MongoClient } = require("mongodb");

let database;

async function mongoConnect(callback) {
  const uri = "mongodb+srv://emirhan:Emirhan1234%21@cluster0.krzxyu1.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const client = new MongoClient(uri);
    await client.connect();
    database = client.db("shop");
    console.log("Connection to the database has been established.");
    callback();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("No database found.");
  }
  return database;
}

module.exports = {
  mongoConnect,
  getDatabase
};
