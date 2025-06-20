import express from "express";
import { borrowBook } from "../controller/borrow.controller";
const borrowRouter = express.Router();


borrowRouter.post("/", borrowBook)


export default borrowRouter