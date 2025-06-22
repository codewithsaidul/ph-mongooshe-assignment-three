import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";
import { APiError } from "../utils/APIError";

const bookSchema = new Schema<IBook>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


bookSchema.pre('findOneAndUpdate', async function (next) {
  const bookId = this.getFilter();
  const key = Object.keys(bookId)[0];
  const book = await this.clone().findOne();
  if (!book) {
    throw new APiError(404, "Resource not found", {
      name: "ResourceNotFoundError",
      errors: {
        book: {
          message: `No book found with the ID '${bookId}'. Cann't Update the book`,
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

bookSchema.pre("findOneAndDelete", async function (next) {
  const bookId = this.getFilter();
  const key = Object.keys(bookId)[0];
  const book = await this.clone().findOne();
  if (!book) {
    throw new APiError(404, "Resource not found", {
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

const Book = model("Book", bookSchema);

export default Book;
