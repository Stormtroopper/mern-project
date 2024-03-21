import express from 'express'
import { Book } from '../models/books.js';
const router=express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        }
        );
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id)
        return res.status(200).json({
            count: books.length,
            data: books
        }
        );
    } catch (e) {
        res.status(500).send({ message: e.message })

    }
})
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.Year_published || !req.body.description) {
            return res.status(400).send({ message: 'Send all the required fields' })
        }
        const newone = {
            title: req.body.title,
            author: req.body.author,
            Year_published: req.body.Year_published,    
            description:req.body.Year_published
        }
        const saved_book = await Book.create(newone)
        return res.status(200).send(saved_book)
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
})
router.put('/:id',async(req,res)=>{
    try {
        if (!req.body.title || !req.body.author || !req.body.Year_published || !req.body.description) {
            return res.status(400).send({ message: 'Send all the required fields' })
        }
        const {id} = req.params;
        const demo = await Book.findByIdAndUpdate(id,req.body);
        if(!demo){
            return res.status(404).json({ message: 'Wrong Book' });

        }
        return res.status(200).send({message:'Updated succesfully'})
    } catch (error) { 
        res.status(500).send({ message: error.message });
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const demo=await Book.findByIdAndDelete(id);
        if(!demo){
            return res.status(404).json({message:'Book not found'})
        }
        return res.status(200).send({message:'Book Deleted'})

    } catch (error) {
        res.status(500).send({ message: error.message });
        
    }
})
export default router;