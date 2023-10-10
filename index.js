const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const path = require("path");
const {processRequests} = require("./services/server/process-main.js");
const { sendMail } = require("./services/gmail.js");


// Instance of an express Node Server
const server = express();
const PORT = process.env.PORT ?? 3030
const indexPage = path.join(__dirname + "/index.html")

// Indicates the server is running or not
server.get("/", (req, res) => {
  res.sendFile(indexPage)
})
// Creates A REST API Endpoint
server.post("/", bodyParser.json(), async (req, res) => {
  console.log("Node Server Processing Request...")
  // sendMail(req.body.Records[0].body)
  const response = await processRequests(req.body, req.headers)
  res.status(response.status).json(response.data)
});

// Perpetual Server Listener
server.listen(PORT, () => console.log("Listing to port " + PORT));
