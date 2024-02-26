import mongoose from 'mongoose';

// Дефинирайте схемата за записите на потребителите
const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  pinCode: Number
});

// Дефинирайте схемата за екскурзиите
const ExcursionSchema = new mongoose.Schema({
  name: String,
  destination: String,
  days: Number,
  price: Number,
  bookings: [BookingSchema] // Поле за списък със записи на потребителите
});


export default ExcursionSchema;
