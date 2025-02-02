"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const labelControllers_1 = require("../controllers/labelControllers");
// Routes
router.post('/', labelControllers_1.createLabel);
router.get('/:userId', labelControllers_1.getLabelsAccordingToAUser);
router.put('/:id', labelControllers_1.editLabel);
router.delete('/:id', labelControllers_1.deleteLabel);
exports.default = router;
