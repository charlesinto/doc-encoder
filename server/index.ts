
import cors from "cors";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
// import Express from 'express'
import morgan from "morgan";
import winston, { stream } from "./config/winston";
import documentRouter from './routers/document.manager.route'

const app: Application = express();

const PORT = process.env.PORT || 8005;
dotenv.config();

// const PORT = 8080;

app.use(morgan("combined", { stream: stream }));

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(  E .bodyParser({limit: '50mb'}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setTimeout(30000)
  next();
});

app.use('/api/v1/cia/document', documentRouter)

app.get("/", (req: Request, res: Response) =>
  res.send("Secret Server running secretly 💥")
);

app.use(function (err: Error, req: Request, res: Response, next: any) {
  winston.error(err.stack ? err.stack : err);

  res.status(500).send({
    message: `Something broke!. Check application logs for helpful tips. OriginalUrl: ${req.originalUrl}  `,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export default app;
