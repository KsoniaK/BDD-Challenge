//CREATION DES DEPENDANCES DE MODULES
//MODULE DE JS.NODE
const mysql = require('mysql'); //APPEL DU MODULE MYSQL QUI PERMET D AGIR SUR UNE BASE DE DONNEES
// const { request } = require('express');
const express = require("express") //APPEL DU MODULE PERMETTANT DE FAIRE LA ROUTE

//IMPORT DES MODULES CREES 
let db = require('./database');//RECUPERE LES MODULES DE LA BASE DE DONNEES

//CREATION DE LA ROUTE QUI SERA EXPORTEES PAR LA SUITE DANS server.js
const app= express.Router();


//AFFICHAGE DES GENRES
// POST /read/genre/series --> ajoute une série
app.post('/genre/series', express.json(), function(req, res) {
  console.log('POST /genre/series body =', req.body);

  const titre_media = req.body.titre_media;
  const image_media = req.body.image_media;
  const date_sortie_media = req.body.date_sortie_media;
  const type_media = 'SERIE'; // Forcé ici

  if (!titre_media || !image_media || !date_sortie_media) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  const sql = `INSERT INTO MEDIA (titre_media, image_media, date_sortie_media, type_media)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [titre_media, image_media, date_sortie_media, type_media], (err, result) => {
    if (err) {
      console.error('Erreur INSERT série:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Cette série existe déjà.' });
      }
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    return res.json({ message: 'Série ajoutée', id: result.insertId });
  });
});


// POST /read/genre/films  --> ajoute un film
app.post('/genre/films', express.json(), function(req, res) {
  // dbg : afficher le body pour debug
  console.log('POST /genre/films body =', req.body);

  const titre_media = req.body.titre_media;
  const image_media = req.body.image_media;
  // accepter date sous forme string/number
  const date_sortie_media = req.body.date_sortie_media;
  // si le front n'envoie pas type_media, on met 'FILM' par défaut
  const type_media = req.body.type_media ? req.body.type_media : 'FILM';

  if (!titre_media || !image_media || !date_sortie_media) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  const sql = `INSERT INTO MEDIA (titre_media, image_media, date_sortie_media, type_media)
               VALUES (?, ?, ?, ?)`;

    db.query(sql, [titre_media, image_media, date_sortie_media, type_media], (err, result) => {
    if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Ce film existe déjà dans la base.' });
        }
        console.error('Erreur INSERT media:', err);
        return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Film ajouté', id: result.insertId });
    });

});

// Films
app.get('/genre/films', function(req, res){
    let selectionFilms = 'SELECT * FROM MEDIA WHERE type_media = "film"';
    db.query(selectionFilms, (err, rows) =>{
        if(err){
            res.send(err.message);
        } else {
            res.json(rows);
        }
    });
});


// Séries
app.get('/genre/series', (req, res) => {
    db.query('SELECT * FROM MEDIA WHERE UPPER(type_media) = "SERIE"', (err, rows) => {
        if (err) res.send(err.message);
        else res.send(rows);
    });
});

//AFFICHAGE DES FILMS/SERIES DONT LA DATE DE SORTIE EST EGALE A 2010. AFFICHER SEULEMENT LES 5 PREMIERS RESULTATS.
app.get('/genre/filtre', function(req, res){//CHEMIN D ACCES A CET API http://localhost:3000 /genre
let selectionFilms = 'SELECT * FROM MEDIA WHERE UPPER(type_media) = "FILM"';
        //LA REQUETE RENVERRA SOIT UNE ERREUR "err" SOIT UN RESULTAT "row" QUI CONTIENT CHAQUE LIGNE ENREGISTREES...
    db.query(selectionFilms, (err, rows, fields) =>{
        //ICI SI IL Y A UNE ERREUR ON NOUS LA MONTRE
        if(err){
            res.send(err.message);
        }else{
            //SI NON ON MONTRE TOUTES LES LIGNES
            res.send(rows);
        }
    })
});
//EXPORT DE LA ROUTE CREATION CREEE QUI VA DEVENIR UN MODULE
module.exports = app

//AFFICHAGE DES GENRES
app.get('/genre', function(req, res){
  let selectionPriorite = 'SELECT * FROM GENRE';
  db.query(selectionPriorite, (err, rows) =>{
    if(err){
      res.send(err.message);
    } else {
      res.send(rows);
    }
  });
});


