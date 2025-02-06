"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
console.log("Jwt-secret", secretKey);
if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        req.user = decoded; // Attach user data to request
        next();
    });
};
exports.authenticate = authenticate;
