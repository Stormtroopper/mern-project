import mongoose from 'mongoose'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
// import { Book } from './models/books.js';
import Routing from './routes/routes.js'
const port = process.env.PORT;
const url = process.env.MONGO_URI
const app = express();
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to mern')
})
app.use('/books',Routing);

mongoose.connect(url).then(() => {
    console.log('SuccessFull Database Connection');
    app.listen(port, () => {
        console.log(`Server listening at ${port}`);
    })

}).catch((e) => {
    console.error(e);
})