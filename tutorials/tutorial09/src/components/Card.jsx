import React from "react";
import "./Card.css";

export default function Card({ name, image_url, description }) {
  return (
    <section className="card">
      <img src={image_url} alt={name} className="card-img" />
      <h2>{name}</h2>
      <p>{description}</p>
    </section>
  );
}
