import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
require('dotenv').config()

const port = process.env.PORT || 3000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lggjuua.mongodb.net/libraryManagement?retryWrites=true&w=majority&appName=Cluster0`
    );
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}


main()
