"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controllers_1 = require("../controllers/borrow.controllers");
const borrowRouter = express_1.default.Router();
borrowRouter.get("/", borrow_controllers_1.getBorrowSummery);
borrowRouter.post("/", borrow_controllers_1.borrowBook);
exports.default = borrowRouter;
