const express=require( "express");
const mongoose=require( "mongoose");
const New_Article=require('./models/models.js')
const article_Router=require( './routes/new_article.js');
const mongoose_connection="mongodb+srv://rjoseph3742:AXUXJFzgk1gWkN0R@cluster0.kzeepqi.mongodb.net/"
const app = express();
// const article_Router = require('/routes/new_article')
const port = 5000;
mongoose.connect(mongoose_connection)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/', async(req, res) => {
    // const articles = [{
    //     title: "Welcome to my blog!",
    //     name:'Mary Higgins Clark',
    //     role:'Junior Copywriter',
    //     img_url:'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    //     content: "This is the home page of my blog.",
    //     createdAt: new Date(),
    // },
    // {
    //     title: "This bitch is paying for this",
    //     name:'Lee Dixon',
    //     role:'Reasearch Consultant',
    //     img_url:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     content: "I like to make myself beleive the planet earth turns slowly ",
    //     created_At: new Date(),
    // }]
    const articles= await New_Article.find().sort({createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})
app.use('/articles', article_Router)
app.listen(5000);
app.listen(console.log(`Server running at port ${port}`))