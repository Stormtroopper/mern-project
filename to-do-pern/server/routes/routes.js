const express=require('express')
const routes=express.Router()
const pool=require('../db')

//post a todo
routes.post('/',async(req,res)=>{
    try {
        const {description}=req.body
        const new_to_do=await pool.query('INSERT INTO demo_todo(description)VALUES($1) RETURNING *',[description])
        // console.log(req.body);
        res.json(new_to_do.rows[0])
    } catch (error) {
        console.error(error);
    }
})

//get all todos
routes.get('/',async(req,res)=>{
    try {
        const getall=await pool.query('SELECT * FROM demo_todo')
        res.json(getall.rows)
    } catch (error) {
        console.error(error);
    }
})

//get a particular todo
routes.get('/:id',async(req,res)=>{
try {
    const {id}=req.params;
    const todo=await pool.query("SELECT * FROM demo_todo  WHERE todo_id=$1",[id])
    res.json(todo.rows[0])
} catch (error) {
    console.error(error);
}
})
//update a todo
routes.put('/:id',async(req,res)=>{
try {
    const {id}=req.params;
    const {description}=req.body
    const updating=await pool.query('UPDATE demo_todo SET description=$1 WHERE todo_id=$2',[description, id])
    res.json('Updated new_todos')
} catch (error) {
    console.error(error);
}
})
//delete a todo
routes.delete('/:id',async(req,res)=>{
try {
    const {id}=req.params
    const deleting=await pool.query('DELETE FROM demo_todo WHERE todo_id=$1',[id])
    res.json('Deleted todo')
} catch (error) {
    console.error(error);
}
})
module.exports=routes