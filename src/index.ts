import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { hotelRouter, adminRouter, authRouter } from "./routes";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(hotelRouter);
app.use(adminRouter);
app.use(authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
