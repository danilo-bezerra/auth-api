import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/dataSource";
import routes from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();

db.initialize()
  .then(() => console.log("DB initialize successful"))
  .catch(() => console.log("DB initialize failed"));

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT);
