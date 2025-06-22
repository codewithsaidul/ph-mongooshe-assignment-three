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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const APIError_1 = require("../utils/APIError");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "title is required"] },
    author: { type: String, required: [true, "author is required"] },
    genre: {
        type: String,
        uppercase: true,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "genre is not valid, got {values} genre",
        },
    },
    isbn: {
        type: String,
        required: [true, "ISBN number is required"],
        unique: true,
    },
    description: String,
    copies: {
        type: Number,
        required: [true, "Copies are required"],
        min: [1, "Copies must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be a whole number without decimals (e.g., 1, 2, 3)",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = this.getFilter();
        const key = Object.keys(bookId)[0];
        const book = yield this.clone().findOne();
        if (!book) {
            throw new APIError_1.APiError(404, "Resource not found", {
                name: "ResourceNotFoundError",
                errors: {
                    book: {
                        message: `No book found with the ID '${bookId._id}'. Cann't Update the book`,
                        name: "ResourceNotFoundError",
                        properties: {
                            message: `Book not found`,
                            operation: "updateBook",
                            location: "params"
                        },
                        kind: "NotFound",
                        path: key,
                        value: bookId._id
                    },
                },
            });
        }
        next();
    });
});
bookSchema.pre("findOneAndDelete", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = this.getFilter();
        const key = Object.keys(bookId)[0];
        const book = yield this.clone().findOne();
        if (!book) {
            throw new APIError_1.APiError(404, "Resource not found", {
                name: "ResourceNotFoundError",
                errors: {
                    book: {
                        message: `No book found with the ID '${bookId._id}'. Cann't Delete the book`,
                        name: "ResourceNotFoundError",
                        properties: {
                            message: "Book Not Found",
                            operation: "deleteBook",
                            location: "params"
                        },
                        kind: "NotFound",
                        path: key,
                        value: bookId._id
                    },
                },
            });
        }
        next();
    });
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
