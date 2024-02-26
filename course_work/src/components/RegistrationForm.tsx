import React, { useState } from "react";

const RegistrationForm = ({
  handleFormSubmit,
  handleInputChange,
  formData,
}) => {
  const { excursion, name, email } = formData;

  return (
    <form onSubmit={handleFormSubmit} className="excursion-form">
      <label className="form-label">
        Име на екскурзията:
        <input
          type="text"
          name="excursion"
          value={excursion}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Вашето име:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Вашият имейл:
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <button type="submit" className="form-button">
        Запиши се
      </button>
    </form>
  );
};

export default RegistrationForm;
