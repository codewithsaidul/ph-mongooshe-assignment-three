import { Request, Response } from "express";
import Borrow from "../models/borrow.model";

// ================= add new book
export const borrowBook = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const borrowBook = new Borrow({ book, quantity, dueDate });
    await borrowBook.updateAvailability(book, quantity);
    await borrowBook.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      borrowBook,
    });
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
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
          latestBorrowTime: { $max: "$createdAt" }, 
        },
      },

      // stage 2
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },

      // stage 3
      { $unwind: "$bookDetails" },

      // stage 4
      {
        $project: {
          _id: 1,
          totalQuantity: 1,
          latestBorrowTime: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },

      // stage 5: নতুন $sort স্টেজ যোগ করুন
      {
        $sort: {
          latestBorrowTime: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summery,
    });
  } catch (error: any) {
    next(error);
  }
};
