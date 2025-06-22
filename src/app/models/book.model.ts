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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.pre("findOneAndDelete", async function (next) {
  const bookId = this.getFilter();
  const key = Object.keys(bookId)[0];
  const book = await this.clone().findOne();
  if (!book) {
    throw new APiError(404, "Resource not found", {
      name: "NotFoundError",
      errors: {
        book: {
          message: "Book Not Found",
          name: "custom error",
          properties: {
            message: "Book Not Found",
            type: "delete book",
            location: "params"
          },
          kind: "Book",
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
