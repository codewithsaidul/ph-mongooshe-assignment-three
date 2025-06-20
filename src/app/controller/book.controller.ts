import { Request, Response } from "express";
import Book from "../model/book.model";

// ================= add new book
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
    // =============== Handle Duplicate ISBN Error Message ==================
    // It extracts detailed error info for isbn uniqueness to send a structured response
    if (error.code === 11000 && error.keyValue) {
      const key = Object.keys(error.keyValue)[0];
      const value = error.keyValue[key];

      const errors = {
        name: "ValidationError",
        errors: {
          [key]: {
            message: `${key} '${value}' already exists.`,
            name: "ValidatorError",
            properties: {
              message: `${key} must be unique`,
              type: "unique",
            },
            kind: "unique",
            path: key,
            value: value,
          },
        },
      };

      res.status(400).json({
        message: "Validation Failed",
        success: false,
        error: errors,
      });
    }

    // =============== Handle Validation Error Message ==================
    // It extracts detailed error info for each invalid field to send a structured response
    if (error.name === "ValidationError") {
      const errors: Record<string, any> = {};

      for (const key in error.errors) {
        const err = error.errors[key];
        errors[key] = {
          message: err.message,
          name: err.name,
          properties: {
            message: err.properties.message,
            type: err.properties.type,
            min: err.properties.min,
          },
          kind: err.kind || null,
          path: err.path || key,
          value: err.value || null,
        };
      }

      res.status(400).json({
        message: "Validation Failed",
        success: false,
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

// ================= get all books
export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
};



// ================= get single book by id
export const getSinlgeBook = async (req: Request, res: Response) => {
  const { bookId }  = req.params

  const book = await Book.findById(bookId);

  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
};





