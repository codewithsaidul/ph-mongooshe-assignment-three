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
  isbn: {
    type: String,
    unique: [true, "Duplicate ISBN number"]
  },
  description: String,
  copies: {
    type: Number
  },
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
