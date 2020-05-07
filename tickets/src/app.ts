import express from "express";
import "express-async-errors";
// import dotenv from 'dotenv';
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@wiselymaker/tickets";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";
// dotenv.config();

const app = express();
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    keys: [process.env.JWT_KEY!],
  })
);
app.use(json());

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
