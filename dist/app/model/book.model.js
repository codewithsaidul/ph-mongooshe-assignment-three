"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
        min: [1, "Copies must be a positive number"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be a number",
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
bookSchema.method("updateAvailability", function () {
    this.available = this.copies > 0;
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
