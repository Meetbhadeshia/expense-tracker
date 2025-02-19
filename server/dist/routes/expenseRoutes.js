"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const expenseControllers_1 = require("../controllers/expenseControllers");
// Routes
router.post('/', expenseControllers_1.createExpense);
router.get('/', expenseControllers_1.readAllExpenses);
router.put('/', expenseControllers_1.editAnExpense);
router.delete('/', expenseControllers_1.deleteAnExpense);
exports.default = router;
