import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
require('dotenv').config()

const port = process.env.PORT || 3000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.log(error);
  }
}


main();



process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection is detected, shutting down ..., ${err}`);

  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
  process.exit(1)
});


process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected, shutting down ...`);
  process.exit(1)
})
