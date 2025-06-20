"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.post("/", book_controller_1.addBook);
bookRouter.get("/", book_controller_1.getBooks);
bookRouter.get("/:bookId", book_controller_1.getSinlgeBook);
bookRouter.put("/:bookId", book_controller_1.updateBookById);
bookRouter.delete("/:bookId", book_controller_1.deleteBookById);
exports.default = bookRouter;
