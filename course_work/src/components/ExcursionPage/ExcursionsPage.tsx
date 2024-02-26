import React, { useState, useEffect } from "react";
import "./ExcursionsPage.css"; // Import your CSS file for styling
import AvailableExcursions from "../AvailableExcursions/AvailableExcursions";
import RegistrationForm from "../RegistrationForm";

const ExcursionsPage = () => {
  const [excursions, setExcursions] = useState([]);
  const [formData, setFormData] = useState({
    excursion: "",
    name: "",
    email: "",
  });
  const [pinCode, setPinCode] = useState("");

  useEffect(() => {
    fetchExcursions();
  }, []);

  const fetchExcursions = async () => {
    const response = await fetch("http://localhost:5000/excursions");
    const data = await response.json();
    setExcursions(data);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const existingRegistration = excursions.find(
      (excursion) =>
        excursion.name === formData.excursion &&
        excursion.bookings.some((booking) => booking.email === formData.email)
    );

    if (existingRegistration) {
      // Ако има съществуваща регистрация, показваме съобщение за грешка
      alert(`Вече имате регистрация за екскурзията "${formData.excursion}".`);
      return;
    }

    const response = await fetch("http://localhost:5000/excursions/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setPinCode(data.pinCode);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="excursions-page">
      <AvailableExcursions excursions={excursions} />
      <RegistrationForm
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        formData={formData}
      />
      {pinCode && (
        <div className="pin-code-container">
          <p className="pin-code">Вашият пин код е: {pinCode}</p>
        </div>
      )}
    </div>
  );
};

export default ExcursionsPage;
