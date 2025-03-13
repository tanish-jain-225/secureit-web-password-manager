require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const url = process.env.MONGO_URI;
const dbName = "secureit";
const collectionName = "passwords";

async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();
  return client;
}

// Get all passwords
app.get("/", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const passwords = await collection.find({}).toArray();
    res.json(passwords);
    await client.close();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Save a password
app.post("/", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const password = req.body;
    const result = await collection.insertOne(password);

    res.json({ success: true, result });
    await client.close();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Delete a password
app.delete("/", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const password = req.body;
    const result = await collection.deleteOne(password);

    res.json({ success: true, result });
    await client.close();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Export the app for Vercel
module.exports = app;
