import express from "express";
import { addBook, getBooks, getSinlgeBook } from "../controller/book.controller";
const bookRouter = express.Router();

bookRouter.post("/", addBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:bookId", getSinlgeBook);

export default bookRouter;
