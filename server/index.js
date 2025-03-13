const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
const dbName = "secureit";
const collectionName = "passwords";

async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();
  return client;
}

module.exports = async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    if (req.method === "GET") {
      // Get all passwords
      const passwords = await collection.find({}).toArray();
      res.status(200).json(passwords);
    } 
    else if (req.method === "POST") {
      // Save a password
      const password = req.body;
      const result = await collection.insertOne(password);
      res.status(201).json({ success: true, result });
    } 
    else if (req.method === "DELETE") {
      // Delete a password
      const password = req.body;
      const result = await collection.deleteOne(password);
      res.status(200).json({ success: true, result });
    } 
    else {
      res.status(405).json({ error: "Method Not Allowed" });
    }

    await client.close();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
