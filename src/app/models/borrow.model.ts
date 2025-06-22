import { model, Schema } from "mongoose";
import { BorrowStaticMethod, IBorrow } from "../interface/borrow.interface";
import { Model } from "mongoose";
import Book from "./book.model";
import { APiError } from "../utils/APIError";

const borrowSchema = new Schema<IBorrow, Model<IBorrow>, BorrowStaticMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
        validator: (val: Date) => val > new Date(),
        message: "Due Date must be in the future",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.method(
  "updateAvailability",
  async function (bookId: string, quantity: number) {
    const book = await Book.findById(bookId);

    if (!book) {
      throw new APiError(404, "Resource not found", {
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
    if (!book?.available) {
      // throw new Error("This Book isn't available at this moment");
      throw new APiError(400, "Book is currently unavailable", {
        name: "UnavailableError",
        errors: {
          book: {
            message: `${book.title} is currently unavailable for borrowing`,
            name: "UnavailableError",
            properties: {
              message: `${book.title} is currently unavailable for borrowing`,
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
    if (book?.copies === undefined || book?.copies < quantity) {
      // throw new Error("Not enough copies available");
      throw new APiError(400, "Validation failed", {
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
    await Book.findByIdAndUpdate(bookId, book);
  }
);

const Borrow = model("Borrow", borrowSchema);

export default Borrow;
