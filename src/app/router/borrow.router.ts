import express from "express";
import { borrowBook, getBorrowSummery } from "../controller/borrow.controller";
const borrowRouter = express.Router();

borrowRouter.get("/", getBorrowSummery);
borrowRouter.post("/", borrowBook);

export default borrowRouter;
