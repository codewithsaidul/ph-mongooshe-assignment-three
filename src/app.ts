import express, { Application, Request, Response } from "express";
import router from "./router";




const app: Application = express();
app.use(express.json())


app.use(router)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Assignment-3");
});

export default app;