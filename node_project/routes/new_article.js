const express=require('express');
const New_Article=require('../models/models.js');   
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('articles/new',{articles:new New_Article()})
})
router.get('/:slug',async(req,res)=>{
    let articles=await New_Article.findOne({slug:req.params.slug})
    if(articles==null)res.redirect('/')
    res.render('articles/show',{articles:articles})
})
router.post('/',async(req,res)=>{
    let articles=new New_Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown,
        role:req.body.role
   })
   try{
    articles=await articles.save();
    res.redirect(`/articles/${articles.id}`)
   }catch(e){
    res.render('articles/new',{articles:articles})
   }
})
module.exports= router;