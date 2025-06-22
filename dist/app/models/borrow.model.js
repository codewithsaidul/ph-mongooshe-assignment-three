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
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("./book.model"));
const APIError_1 = require("../utils/APIError");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be a number",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"],
        validate: {
            validator: (val) => val > new Date(),
            message: "Due Date must be in the future",
        },
    },
}, {
    versionKey: false,
    timestamps: true,
});
borrowSchema.method("updateAvailability", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        // checking requested bokk exist or not
        if (!book) {
            throw new APIError_1.APiError(404, "Resource not found", {
                name: "ResourceNotFoundError",
                errors: {
                    book: {
                        message: `No book found with the ID '${bookId}'. Cann't Borrow`,
                        name: "ResourceNotFoundError",
                        properties: {
                            message: `Book not found`,
                            operation: "borrowBook",
                            location: "body",
                        },
                        kind: "NotFound",
                        path: "_id",
                        value: bookId,
                    },
                },
            });
        }
        //   checking book available status
        if (!(book === null || book === void 0 ? void 0 : book.available)) {
            // throw new Error("This Book isn't available at this moment");
            throw new APIError_1.APiError(400, "Book is currently unavailable", {
                name: "UnavailableError",
                errors: {
                    book: {
                        message: `${book.title} book is currently unavailable for borrowing`,
                        name: "UnavailableError",
                        properties: {
                            message: `${book.title} book is currently unavailable for borrowing`,
                            type: "BookAvailability",
                        },
                        kind: "AvailabilityError",
                        path: "_id",
                        value: bookId,
                    },
                },
            });
        }
        //   checking enough copies are available or not
        if ((book === null || book === void 0 ? void 0 : book.copies) === undefined || (book === null || book === void 0 ? void 0 : book.copies) < quantity) {
            // throw new Error("Not enough copies available");
            throw new APIError_1.APiError(400, "Validation failed", {
                name: "BusinessLogicError",
                errors: {
                    copies: {
                        message: `Not enough copies of '${book.title}' book available to borrow`,
                        name: "BusinessLogicError",
                        properties: {
                            message: `Only ${book.copies} copies of '${book.title}' book are available`,
                            type: "InsufficientCopies",
                        },
                        kind: "BusinessLogic",
                        path: "copies",
                        value: quantity,
                    },
                },
            });
        }
        book.copies -= quantity;
        book.available = book.copies > 0;
        // update book available copies & book available or not
        yield book_model_1.default.findByIdAndUpdate(bookId, book);
    });
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
