import { model, Schema } from "mongoose";
import { BorrowStaticMethod, IBorrow } from "../interface/borrow.interface";
import { Model } from "mongoose";
import Book from "./book.model";

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

    //   checking book available status
    if (!book?.available) {
      throw new Error("This Book isn't available at this moment");
    }

    //   checking enough copies are available or not
    if (book?.copies === undefined || book?.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    book.copies -= quantity;
    book.available = book.copies > 0;

    // update book available copies & book available or not
    await Book.findByIdAndUpdate(bookId, book);
  }
);

const Borrow = model("Borrow", borrowSchema);

export default Borrow;
