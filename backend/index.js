import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book.model.js";
import booksRoute from "./routes/books.route.js";
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
app.use(cors());

app.get(`/`, (request, response) => {
  console.log(request);
  return response.status(234).send(`Welcome to MERN stack tutorial`);
});

app.use(`/books`, booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
