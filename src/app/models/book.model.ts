import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";
import { APiError } from "../utils/APIError";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "title is required"] },
    author: { type: String, required: [true, "author is required"] },
    thumbnail: { type: String, required: [true, "thumbnail is required"] },
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
        message:
          "Copies must be a whole number without decimals (e.g., 1, 2, 3)",
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

bookSchema.pre("findOneAndUpdate", async function (next) {
  const bookId = this.getFilter();
  const key = Object.keys(bookId)[0];
  const book = await this.clone().findOne();
  if (!book) {
    throw new APiError(404, "Resource not found", {
      name: "ResourceNotFoundError",
      errors: {
        book: {
          message: `No book found with the ID '${bookId._id}'. Cann't Update the book`,
          name: "ResourceNotFoundError",
          properties: {
            message: `Book not found`,
            operation: "updateBook",
            location: "params",
          },
          kind: "NotFound",
          path: key,
          value: bookId._id,
        },
      },
    });
  }

  // ========== update availity status using copies value
  const bookUpdate: any = this.getUpdate();

  if (!bookUpdate) {
    return next();
  }


   // ধাপ ২: সরাসরি প্রোপার্টি হিসেবে 'copies' আছে কিনা দেখুন
  if (bookUpdate.copies !== undefined) {
    if (bookUpdate.copies > 0) {
      bookUpdate.available = true;
    } else {
      bookUpdate.available = false;
    }
  }


  next();
});

const Book = model("Book", bookSchema);

export default Book;  