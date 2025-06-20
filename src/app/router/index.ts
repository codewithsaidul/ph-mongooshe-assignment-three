import express from "express"
import bookRouter from "./book.router";
import borrowRouter from "./borrow.router";
const router = express.Router()

router.use("/books", bookRouter)
router.use("/borrow", borrowRouter)

export default router;