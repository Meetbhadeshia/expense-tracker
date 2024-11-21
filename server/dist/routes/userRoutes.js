"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userControllers_1 = require("../controllers/userControllers");
// Routes
router.post('/', userControllers_1.createUser);
router.post('/login', userControllers_1.loginUser);
router.put('/', userControllers_1.updateUser);
router.delete('/:id', userControllers_1.deleteUser);
exports.default = router;
