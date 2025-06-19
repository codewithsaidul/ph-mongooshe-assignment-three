import { Request, Response } from "express";
import Book from "../model/book.model";

export const addBook = async (req: Request, res: Response) => {
  try {
    const bookBody = req.body;

    const book = await Book.create(bookBody);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    // 1. Mongoose Validation Error
    if (error.name === "ValidationError") {
      const errors: Record<string, any> = {};

      for (const key in error.errors) {
        const err = error.errors[key];
        errors[key] = {
          message: err.message,
          name: err.name, // ValidatorError ইত্যাদি
          properties: err.properties || {},
          kind: err.kind || null,
          path: err.path || key,
          value: err.value || null,
        };
      }

        res.status(400).json({
        success: false,
        message: "Validation failed",
        error: {
          name: "ValidationError",
          errors: errors,
        },
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};
export const getBooks = async (req: Request, res: Response) => {
  console.log("Hello");
};
