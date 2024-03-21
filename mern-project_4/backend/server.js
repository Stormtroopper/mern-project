const express = require('express')
// import routing from './routes/user-routes.js'
// import mongoose from "mongoose"
const routing = require('./routes/user-routes.js');
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongodburi = `mongodb+srv://rjoseph3742:${process.env.MONGO_PASSWORD}@cluster0.kzeepqi.mongodb.net/auth_database?retryWrites=true&w=majority`
const port = 5000;
// app.use('/', (req, res) => {
//     res.send('Hi There')
// })
// app.listen(port, () => {
//     console.log(`Server running in port ${port}`)
// })
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieparser())
app.use(express.json());
app.use('/api', routing);
mongoose.connect(mongodburi).then(() => {
  app.listen(port);
  console.log('database connected')
}).catch((err) => { console.log(err) })