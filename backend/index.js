import express from "express";
import 'dotenv/config';
import mongoose from "mongoose"
import cors from 'cors'
import { Books } from "./models/books_model.js";
const port = process.env.PORT;
const mongoconnection = process.env.MONGODB_URI
const app = express();
//middleware to parse the JSON data
app.use(express.json())
app.use(cors())
//Get route
app.get('/', (res, req) => {
    console.log(req);
    return res.status(234).send('Welcome one and all');
});
// app.use('/books', routing);
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.published) {
            return res.status(400).send({ message: 'Please provide a title, author,publishedYear' });
        }
        const newone = {
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
        };
        const book = await Books.create(newone);
        return res.status(201).send(book)
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
})
//Getting all the books
app.get('/books', async (req, res) => {
    try {
        const books = await Books.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message })
    }
});
//Route to get one book from database by id
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Books.findById(id);
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message })
    }
})
//Route to update a book
app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.published) {
            return res.status(400).send({ message: 'Send all the required fields: title, author,publishedYear' });
        }
        const { id } = req.params;
        const result = await Books.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Books not found' });
        }
        return res.status(200).send({ message: 'Books updated successfully' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
})
//Route to delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Books.findByIdAndUpdate(id);
        if (!result) {
            return res.status(404).json({ message: 'Books not found' });
        }
        return res.status(200).send({ message: 'Books deleted successfully' });

    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });

    }
})
//Database connection
mongoose.connect(mongoconnection).then(() => {
    console.log('App connected');
    app.listen(port, () => {
        console.log(`App listening on port: ${port}`)
    })
}).catch((e) => {
    console.log(e);
})