import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const bookSchema = new Schema<IBook>({
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
      message: "genre is not valid, got {values} genre"
    },
    
  },
  description: String,
  copies: [Number, "book copies are required"],
  available: {
    type: Boolean,
    default: true
  }
}, {
    versionKey: false,
    timestamps: true
});



const Book = model("Book", bookSchema);

export default Book
