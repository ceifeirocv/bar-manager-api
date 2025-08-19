import express, { Express, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app: Express = express();
const port = process.env.PORT || 3000;

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
