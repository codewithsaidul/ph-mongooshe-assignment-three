import express from "express";
import { addBook, getBooks } from "../controller/book.controller";
const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post("/", addBook);

export default bookRouter;
