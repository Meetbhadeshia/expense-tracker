"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const expenseRoutes_js_1 = __importDefault(require("./routes/expenseRoutes.js")); // Ensure the correct path and .js extension
// Initialize Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Use Express JSON Middleware
app.use(express_1.default.json()); // You don't need body-parser anymore
app.use((0, cors_1.default)());
// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/expenses'; // Add your DB name here
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err));
// routes
app.use("/api/expenses", expenseRoutes_js_1.default);
app.get("/", (req, res) => { res.send("hi"); });
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
