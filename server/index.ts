import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import expenseRoutes from "./routes/expenseRoutes.js"; // Ensure the correct path and .js extension

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Use Express JSON Middleware
app.use(express.json()); // You don't need body-parser anymore
app.use(cors());

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/expenses'; // Add your DB name here

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err));

// routes
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => { res.send("hi") })

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
