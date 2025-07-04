"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./app/router"));
const globalErrorHandler_1 = require("./app/utils/globalErrorHandler");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://libralite.vercel.app']
}));
app.use("/api", router_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Assignment-3");
});
// ✅ LAST LINE
app.use(globalErrorHandler_1.globalErrorHandler); // MUST BE LAST
exports.default = app;
