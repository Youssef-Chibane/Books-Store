import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book.model.js";

const app = express();

app.use(express.json());

app.get(`/`, (request, response) => {
    console.log(request);
    return response.status(234).send(`Welcome to MERN stack tutorial`);
})

// Route to create a new book

app.post(`/books`, async (request, response) => {
    try {
        // Validate required fields
        if ( !request.body.title || !request.body.author || !request.body.publishYear ) {
            return response.status(400).send({ message: `Send all required fields: title, author, publishYear` });
        }

        // If validation passes, create the new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        // Send response with created book
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get all books

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data : books
        }); // Send the books in the response
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get one book by id

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log(`App connected to database`);
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });