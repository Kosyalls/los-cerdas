import { useState } from "react";
import { photos, type Photo } from "./data/photos";

export function Gallery({ onSelect }: { onSelect: (photo: Photo) => void }) {
  const [filter, setFilter] = useState("all");
  const visible = photos.filter(
    (photo) =>
      filter === "all" ||
      (filter === "portrait"
        ? photo.height > photo.width
        : photo.width >= photo.height),
  );
  const filters = [
    { id: "all", label: `Todas · ${photos.length}` },
    { id: "landscape", label: "Horizontales" },
    { id: "portrait", label: "Verticales" },
  ];
  return (
    <div className="gallery-content">
      <p className="eyebrow">02 / TODAS LAS PRUEBAS</p>
      <h2>
        LA MEMORIA
        <br />
        <span className="red-text">TIENE PRUEBAS.</span>
      </h2>
      <p className="gallery-intro">
        {photos.length} imágenes. Aquí no se ha destruido ninguna prueba.
      </p>
      <div
        className="gallery-filters"
        role="group"
        aria-label="Filtrar fotografías"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="gallery-count mono" role="status">
        {visible.length} DE {photos.length} IMÁGENES
      </p>
      <div className="gallery-grid">
        {visible.map((photo) => (
          <button
            type="button"
            className="gallery-card"
            key={photo.id}
            onClick={() => onSelect(photo)}
            aria-label={`Ampliar ${photo.id}`}
          >
            <img
              src={photo.src}
              alt={photo.text}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
            <span className="mono">
              {photo.id}
              <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>
      <p className="gallery-note mono">
        Las fechas de las aventuras y las demás identidades siguen pendientes de
        vuestro testimonio.
      </p>
    </div>
  );
}
