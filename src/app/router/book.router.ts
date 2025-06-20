import express from "express";
import { addBook, getBooks, getSinlgeBook, updateBookById } from "../controller/book.controller";
const bookRouter = express.Router();

bookRouter.post("/", addBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:bookId", getSinlgeBook);
bookRouter.put("/:bookId", updateBookById);

export default bookRouter;
