"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./app/router"));
const globalErrorHandler_1 = require("./app/utils/globalErrorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", router_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Assignment-3");
});
// ✅ LAST LINE
app.use(globalErrorHandler_1.globalErrorHandler); // MUST BE LAST
exports.default = app;
