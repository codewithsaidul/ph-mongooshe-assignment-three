import express from "express";
import { borrowBook, getBorrowSummery } from "../controllers/borrow.controllers";
const borrowRouter = express.Router();

borrowRouter.get("/", getBorrowSummery);
borrowRouter.post("/", borrowBook);

export default borrowRouter;
