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
exports.getBorrowSummery = exports.borrowBook = void 0;
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
// ================= add new book
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const borrowBook = new borrow_model_1.default({ book, quantity, dueDate });
        yield borrowBook.updateAvailability(book, quantity);
        yield borrowBook.save();
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            borrowBook,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBook = borrowBook;
// ================= get borrow book summery
const getBorrowSummery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summery = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        next(error);
    }
});
exports.getBorrowSummery = getBorrowSummery;
