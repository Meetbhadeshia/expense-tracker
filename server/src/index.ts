import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import morgan from "morgan"
import expenseRoutes from "./routes/expenseRoutes"; // Ensure the correct path and .js extension
import userRoutes from "./routes/userRoutes"; // Ensure the correct path and .js extension
import labelRoutes from "./routes/labelRoutes"; 

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Use Express JSON Middleware
app.use(express.json()); // You don't need body-parser anymore
app.use(cors());

// Use morgan middleware
app.use(morgan('dev')); // Logs requests in 'dev' format

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/expenses'; // Add your DB name here

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err));

// routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/labels", labelRoutes);

app.get("/", (req, res) => { res.send("hi") })

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
