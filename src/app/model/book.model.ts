import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

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
      required: [true, "Book copies are required"],
      min: [1, "Book copies must be a positive number"],
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


bookSchema.method("updateAvailability", function () {
  this.available = this.copies > 0;
})

const Book = model("Book", bookSchema);

export default Book;
