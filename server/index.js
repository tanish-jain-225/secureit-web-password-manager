require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
const dbName = "secureit";
const collectionName = "passwords";

let db, collection;

async function connectDB() {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    collection = db.collection(collectionName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

// Get all passwords
app.get("/", async (req, res) => {
  try {
    const passwords = await collection.find({}).toArray();
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// Save a new password
app.post("/", async (req, res) => {
  try {
    const password = req.body;
    if (!password || !password.name || !password.value) {
      return res.status(400).json({ error: "Invalid password data" });
    }
    const result = await collection.insertOne(password);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: "Failed to save password" });
  }
});

// Delete a password
app.delete("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Password name is required" });
    }
    const result = await collection.deleteOne({ name });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete password" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
