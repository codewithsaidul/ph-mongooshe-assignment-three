import { Request, Response } from "express";
import Book from "../models/book.model";
import { APiError } from "../utils/APIError";

// ================= add new book
export const addBook = async (req: Request, res: Response, next: Function) => {
  try {
    const bookBody = req.body;

    const book = await Book.create(bookBody);

    res.status(200).json({
      success: true,
      message: "Book has been created successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

// ================= get all books
export const getBooks = async (req: Request, res: Response, next: Function) => {
  try {
    const {
      page: pageQuery = 1,
      sortBy = "createdAt",
      sort = "desc",
      limit: limitQuery = 10,
    } = req.query;

    const page = parseInt(pageQuery as string);
    const limit = parseInt(limitQuery as string);

    const skip = (page - 1) * limit;
    const query: Record<string, any> = {};



    const total = await Book.countDocuments()

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error: any) {
    next(error);
  }
};

// ================= get single book by id
export const getSinlgeBook = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      throw new APiError(404, "Resource not found", {
        name: "NotFoundError",
        errors: {
          book: {
            message: "Book Not Found",
            name: "custom error",
            properties: {
              message: "Book Not Found",
              type: "Book",
            },
            kind: "Book",
            path: "BookId",
            value: bookId,
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

// ================= update book by id
export const updateBookById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { bookId } = req.params;
    const bookBody = req.body;

    const book = await Book.findOneAndUpdate({ _id: bookId }, bookBody);

    res.status(200).json({
      success: true,
      message: "Book has been updated successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

// ================= delete book by id
export const deleteBookById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { bookId } = req.params;
    await Book.findOneAndDelete({ _id: bookId });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};
