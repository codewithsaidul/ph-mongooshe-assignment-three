import express, { Application, Request, Response } from "express";
import router from "./app/router";
import { globalErrorHandler } from "./app/utils/globalErrorHandler";
import cors from "cors"



const app: Application = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://libralite.vercel.app']
}))


app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Assignment-3");
});



// ✅ LAST LINE
app.use(globalErrorHandler); // MUST BE LAST

export default app;