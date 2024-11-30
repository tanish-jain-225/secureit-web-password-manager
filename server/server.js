const express = require("express");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
const serverType = "http";
const port = 3000;

app.use(cors());
app.use(bodyparser.json());

// Connection URL
const user = 'tanish-jain-225'
const pass = 'tanishjain02022005'
const url = `mongodb+srv://${user}:${pass}@cluster0.578qvco.mongodb.net/`;
const client = new MongoClient(url);
client.connect();
const dbName = "secureit";
const passwords = "passwords"

// get all passwords
app.get("/", async (req, res) => {
  // mongo process
  const db = client.db(dbName);
  const collection = db.collection(passwords);
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// post password by save
app.post("/", async (req, res) => {
  // mongo process
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection(passwords);
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

// delete a password
app.delete("/", async (req, res) => {
  // mongo process
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection(passwords);
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

// Listen on port get app
app.listen(port, () => {
  console.log(
    `App listening on port ${port} -`,
    `${serverType}://localhost:${port}`
  );
});

