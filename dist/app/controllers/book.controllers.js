"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getSinlgeBook = exports.getBooks = exports.addBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const APIError_1 = require("../utils/APIError");
// ================= add new book
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookBody = req.body;
        const book = yield book_model_1.default.create(bookBody);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addBook = addBook;
// ================= get all books
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter = "none", sortBy = "createdAt", sort = "desc", limit = 10, } = req.query;
        const query = {};
        // filter by genre
        if (filter !== "none") {
            query.genre = filter;
        }
        const books = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(parseInt(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBooks = getBooks;
// ================= get single book by id
const getSinlgeBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            throw new APIError_1.APiError(404, "Resource not found", {
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
    }
    catch (error) {
        next(error);
    }
});
exports.getSinlgeBook = getSinlgeBook;
// ================= update book by id
const updateBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const bookBody = req.body;
        const book = yield book_model_1.default.findOneAndUpdate({ _id: bookId }, bookBody);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBookById = updateBookById;
// ================= delete book by id
const deleteBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.default.findOneAndDelete({ _id: bookId });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBookById = deleteBookById;
