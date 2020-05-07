import express from "express";
import "express-async-errors";
// import dotenv from 'dotenv';
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentuser } from "./routes/current-user";
import { signin } from "./routes/signin";
import { signout } from "./routes/signout";
import { signup } from "./routes/signup";
import { errorHandler, NotFoundError } from "@wiselymaker/tickets";
// dotenv.config();

const app = express();
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    keys: [process.env.JWT_KEY!]
  })
);
app.use(json());
app.use(currentuser);
app.use(signup);
app.use(signin);
app.use(signout);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };