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
    await borrowBook.save();

    res.status(200).json({ success: true, message: "Book borrowed successfully", borrowBook });
  } catch (error: any) {
    next(error);
  }
};




// ================= get borrow book summery
export const getBorrowSummery = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
  
    const summery = await Borrow.aggregate([
      // stage 1
      {
        $group:  {
          _id: "$book",
          totalQuantity: { $sum: "$quantity"}
        }
      },

      // stage 2
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },

      // stage 3
      { $unwind: "$bookDetails"},

      // stage 4
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
        }
      }
    ])


    res.status(200).json({ success: true, message: "Borrowed books summary retrieved successfully", data: summery });
  } catch (error: any) {
    next(error);
  }
};

