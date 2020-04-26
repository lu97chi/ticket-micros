import express from "express";
import "express-async-errors";
// import dotenv from 'dotenv';
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentuser } from "./routes/current-user";
import { signin } from "./routes/signin";
import { signout } from "./routes/signout";
import { signup } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
// dotenv.config();

const app = express();

app.use(json());
app.use(currentuser);
app.use(signup);
app.use(signin);
app.use(signout);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);


const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000!!!!");
  });
};

start();
