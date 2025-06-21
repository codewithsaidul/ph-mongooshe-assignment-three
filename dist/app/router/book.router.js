"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("../controllers/book.controllers");
const bookRouter = express_1.default.Router();
bookRouter.post("/", book_controllers_1.addBook);
bookRouter.get("/", book_controllers_1.getBooks);
bookRouter.get("/:bookId", book_controllers_1.getSinlgeBook);
bookRouter.put("/:bookId", book_controllers_1.updateBookById);
bookRouter.delete("/:bookId", book_controllers_1.deleteBookById);
exports.default = bookRouter;
