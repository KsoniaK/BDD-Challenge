import React, { useEffect, useState } from "react";
import AjouterFilms from "./AjouterFilms";

function Films() {
  const [films, setFilms] = useState([]);

  // 🟢 1. Charger la liste des films au montage du composant
  useEffect(() => {
    fetch("https://bdd-challenge.onrender.com/read/genre/films")
      .then((res) => res.json())
      .then((data) => {
        console.log("Films reçus :", data);
        setFilms(data);
      })
      .catch((err) => console.error("Erreur fetch films :", err));
  }, []);


  // 🟢 2. Fonction pour ajouter un film
  const ajouterFilm = (titre, image, date) => {
  fetch("https://bdd-challenge.onrender.com/read/genre/films", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titre_media: titre,
      image_media: image,
      date_sortie_media: date,
      type_media: "FILM",
    }),
  })
      .then((res) => res.json())
      .then((data) => {
        console.log("Film ajouté :", data);
        // Recharger la liste des films après ajout
        return fetch("https://bdd-challenge.onrender.com/read/genre/films");
      })
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Erreur ajout film :", err));
  };

  return (
    <div>
      <h1>Films</h1>
      <h2>Ajouter un film</h2>
      {/* 🟢 Passe la fonction d’ajout au composant AjouterFilms */}
      <AjouterFilms onAddFilm={ajouterFilm} />
      {/* 🟢 Affiche les films */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {films.map((film) => (
          <div key={film.id_media} style={{ margin: "10px" }}>
            <img src={film.image_media} alt={film.titre_media} width="150" />
            <h3>{film.titre_media}</h3>
            <p>{film.date_sortie_media}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Films;
