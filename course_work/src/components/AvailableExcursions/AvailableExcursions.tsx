import React from "react";
import "./AvailableExcursions.css";

const AvailableExcursions = ({ excursions }) => {
  return (
    <div className="excursions-container">
      <h1 className="excursions-heading">Екскурзии</h1>
      <ul className="excursions-list">
        {excursions.map((excursion, index) => (
          <li key={index} className="excursion-item">
            <strong>{excursion.name}</strong> - {excursion.destination},{" "}
            {excursion.days} дни, Цена: {excursion.price} лв
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableExcursions;
