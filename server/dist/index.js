"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes")); // Ensure the correct path and .js extension
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Ensure the correct path and .js extension
// Initialize Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Use Express JSON Middleware
app.use(express_1.default.json()); // You don't need body-parser anymore
app.use((0, cors_1.default)());
// Use morgan middleware
app.use((0, morgan_1.default)('dev')); // Logs requests in 'dev' format
// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/expenses'; // Add your DB name here
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err));
// routes
app.use("/api/expenses", expenseRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res) => { res.send("hi"); });
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
