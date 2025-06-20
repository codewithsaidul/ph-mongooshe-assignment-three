import { Request, Response } from "express";
import Borrow from "../model/borrow.model";

// ================= add new book
export const borrowBook = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { bookId, quantity, dueDate } = req.body;


    const borrowBook = new Borrow({ book: bookId, quantity, dueDate });
    await borrowBook.updateAvailability(bookId, quantity);
    await borrowBook.save()

    res
      .status(200)
      .json({ message: "Book borrowed successfully", borrowBook });
  } catch (error: any) {
    next(error)
  }
};
