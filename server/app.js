//CREATION DES DEPENDANCES DE MODULES
//MODULE DE JS.NODE
//const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mysqlApostrophe = require("mysql-apostrophe");


// Autorise toutes les origines (React, Postman, etc.)
const cors = require("cors");
app.use(cors({
  origin: "https://ksoniak.github.io",  // ton site GitHub Pages
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//MISE EN PLACE DU BODYPARSER QUI PERMET DE LIRE LES JSON ET LES URL ENVOYES PAR LES FORMULAIRES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

//MISE EN PLACE DE msqlApostrophe
app.use(mysqlApostrophe); //PERMET D INSERER DES CHAMPS CONTENANT DES APOSTROPHES

// RECUPERATION DES FICHIERS ROUTES DANS LE DOSSIER ROUTES
const lecture = require("./routes/read");
// const ajouter = require("./routes/create")
// const apostrophe = require("./routes/update")

//UTILISATION DES ROUTES
app.use("/read", lecture);
// app.use("/create", ajouter);
// app.use("/apostrophe", apostrophe);




//CHOIX DU PORT UTILISE PAR LE SERVEUR
const port = process.env.PORT || 3000; //RECUPERE LE PORT LIBRE SI NON 
app.listen(port, function(){
    console.log("Ok ça marche");
    console.log("Le serveur utilise le port: " + port)
});

