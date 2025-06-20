import { Request, Response } from "express";
import Book from "../model/book.model";

// ================= add new book
export const addBook = async (req: Request, res: Response, next: Function) => {
  try {
    const bookBody = req.body;

    const book = await Book.create(bookBody);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    next(error);
  }
};

// ================= get all books
export const getBooks = async (req: Request, res: Response, next: Function) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
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

    const book = await Book.findByIdAndUpdate(bookId, bookBody);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
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

    await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};
