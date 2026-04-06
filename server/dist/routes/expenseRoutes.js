"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const expenseControllers_1 = require("../controllers/expenseControllers");
const auth_1 = require("../middlewares/auth");
// Routes
router.post('/', auth_1.authenticate, expenseControllers_1.createExpense);
router.get('/', auth_1.authenticate, expenseControllers_1.readAllExpenses);
router.put('/', auth_1.authenticate, expenseControllers_1.editAnExpense);
router.delete('/', auth_1.authenticate, expenseControllers_1.deleteAnExpense);
exports.default = router;
