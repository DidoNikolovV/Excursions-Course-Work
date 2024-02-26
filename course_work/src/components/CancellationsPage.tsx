import React, { useState } from "react";

const CheckRegistrationPage = () => {
  const [formData, setFormData] = useState({ email: "", pinCode: "" });
  const [excursionInfo, setExcursionInfo] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCheckRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/check-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setExcursionInfo(data.excursionInfo);
        setJwtToken(data.jwtToken);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Възникна грешка при извършване на заявката.");
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
        setExcursionInfo(null);
        setJwtToken(null);
        setFormData({ email: "", pinCode: "" });
      } else {
        setErrorMessage("Възникна грешка при анулиране на регистрацията.");
      }
    } catch (error) {
      setErrorMessage("Възникна грешка при анулиране на регистрацията.");
    }
  };

  return (
    <div>
      <h2>Проверка на регистрации и отписване</h2>
      <form onSubmit={handleCheckRegistration}>
        <label>
          Имейл:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Пин код:
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Провери регистрацията</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {excursionInfo && (
        <div>
          <h3>Информация за екскурзията</h3>
          <p>Име: {excursionInfo.name}</p>
          <p>Дестинация: {excursionInfo.destination}</p>
          <p>Дни: {excursionInfo.days}</p>
          <p>Цена: {excursionInfo.price}</p>
          <button onClick={handleCancelBooking}>Анулирай</button>
        </div>
      )}
    </div>
  );
};

export default CheckRegistrationPage;
