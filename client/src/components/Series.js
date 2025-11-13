import React, { useEffect, useState } from "react";
import AjouterSeries from './AjouterSeries';

function Series() {
  const [series, setSeries] = useState([]);

  // 🟢 1. Charger la liste des séries au montage du composant
  useEffect(() => {
    fetch("https://bdd-challenge.onrender.com/read/genre/series") // <-- URL du backend
      .then((res) => res.json())
      .then((data) => {
        console.log("Séries reçues :", data);
        setSeries(data);
      })
      .catch((err) => console.error("Erreur fetch séries :", err));
  }, []);

  // 🟢 2. Fonction pour ajouter un film
  const ajouterSerie = (titre, image, date) => {
    fetch("https://bdd-challenge.onrender.com/read/genre/series", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre_media: titre,
        image_media: image,
        date_sortie_media: date,
        type_media: "SERIE", // important !
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Série ajoutée :", data);
        // Recharger la liste des films après ajout
        return fetch("https://bdd-challenge.onrender.com/read/genre/series");
      })
      .then((res) => res.json())
      .then((data) => setSeries(data))
      .catch((err) => console.error("Erreur ajout série :", err));
  };

  return (
            <div>
                <h2>Séries</h2>
                <h3>Ajouter une série</h3>
                {/* 🟢 Passe la fonction d’ajout au composant AjouterSeries */}
                <AjouterSeries onAddSerie={ajouterSerie} />
                {/* 🟢 Affiche les séries */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {series.map((serie) => (
                    <div key={serie.id_media} style={{ margin: "10px" }}>
                        <img src={serie.image_media} alt={serie.titre_media} width="150" />
                        <h3>{serie.titre_media}</h3>
                        <p>{serie.date_sortie_media}</p>
                    </div>
                    ))}
                </div>
            </div>
  );
}

export default Series;