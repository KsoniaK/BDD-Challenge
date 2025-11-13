// MODULES
const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mysqlApostrophe = require("mysql-apostrophe");

// ----- CORS EN PREMIER -----  
app.use(cors({
  origin: "https://ksoniak.github.io", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Headers manuels pour Render (souvent nécessaires)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ksoniak.github.io");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MYSQL APOSTROPHE
app.use(mysqlApostrophe);

// ROUTES
const lecture = require("./routes/read");
// const ajouter = require("./routes/create")
// const apostrophe = require("./routes/update")

app.use("/read", lecture);
// app.use("/create", ajouter);
// app.use("/apostrophe", apostrophe);

// ----- PORT -----
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Ok ça marche");
  console.log("Le serveur utilise le port: " + port);
});
