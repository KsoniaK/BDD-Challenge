import React, { useState } from "react";

function AjouterFilms({ onAddFilm }) {
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titre && image && date) {
      onAddFilm(titre, image, date);
      setTitre("");
      setImage("");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre du film"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de l'image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="number"
        placeholder="Année de sortie"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AjouterFilms;
