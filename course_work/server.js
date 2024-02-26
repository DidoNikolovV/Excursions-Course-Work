import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import ExcursionSchema from './src/components/ExcursionPage/ExcursionSchema.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/excursions', { useNewUrlParser: true, useUnifiedTopology: true });
const Excursion = mongoose.model('Excursion', ExcursionSchema);

// Routes
app.get('/excursions', async (req, res) => {
  try {
    const excursions = await Excursion.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(excursions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/excursions/book', async (req, res) => {
  const { excursion, name, email } = req.body;

  // Намерете екскурзията в базата данни по името или друг уникален идентификатор
  try {
    const existingExcursion = await Excursion.findOne({ name: excursion });
    if (!existingExcursion) {
      return res.status(404).json({ message: "Екскурзията не е намерена." });
    }

    // Генерирайте пин код (логика за генериране)
    const pinCode = generatePinCode();

    // Добавете потребителя към списъка с регистрациите на екскурзията
    existingExcursion.bookings.push({ name, email, pinCode });
    await existingExcursion.save();

    // Изпращане на потвърждение за успешна регистрация
    res.json({ pinCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/check-registration', async (req, res) => {
  const { email, pinCode } = req.body;

  try {
    // Find the excursion with the provided email and pin code
    const excursion = await Excursion.findOne({ 'bookings.email': email, 'bookings.pinCode': pinCode });
    if (!excursion) {
      return res.status(404).json({ message: 'Няма регистрация с тези данни.' });
    }

    // Generate JWT token containing the user's email
    const jwtToken = jwt.sign({ email }, 'secret_key');

    // Return excursion information and JWT token
    res.json({ excursionInfo: excursion, jwtToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for canceling booking
app.post('/cancel-booking', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Необходимо е да сте влезли в системата за да анулирате регистрацията си.' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, 'secret_key');
    const email = decoded.email;

    // Find the excursion with the user's email
    const excursion = await Excursion.findOne({ 'bookings.email': email });
    if (!excursion) {
      return res.status(404).json({ message: 'Регистрацията не може да бъде намерена.' });
    }

    // Remove the user's booking from the excursion
    excursion.bookings = excursion.bookings.filter(booking => booking.email !== email);
    await excursion.save();

    res.json({ message: 'Регистрацията беше успешно анулирана.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




function generatePinCode() {
  return Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit pin code
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
