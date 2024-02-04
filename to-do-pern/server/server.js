const express=require('express')
const app=express()
const cors=require('cors');
const port=5000;
app.use(cors());
app.use(express.json())

// //post a todo
// app.post('/todos',async(req,res)=>{
//     try {
//         const {description}=req.body
//         const new_to_do=await pool.query('INSERT INTO demo_todo(description)VALUES($1) RETURNING *',[description])
//         // console.log(req.body);
//         res.json(new_to_do.rows[0])
//     } catch (error) {
//         console.error(error);
//     }
// })

// //get all todos
// app.get('/todos',async(req,res)=>{
//     try {
//         const getall=await pool.query('SELECT * FROM demo_todo')
//         res.status(201).json(getall.rows)
//     } catch (error) {
//         console.error(error);
//     }
// })

// //get a particular todo
// app.get('/todos/:id',async(req,res)=>{
// try {
//     const {id}=req.params;
//     const todo=await pool.query("SELECT * FROM demo_todo  WHERE todo_id=$1",[id])
//     res.status(201).json(todo.rows[0])
// } catch (error) {
//     console.error(error);
// }
// })
// //update a todo
// app.put('/todos/:id',async(req,res)=>{
// try {
//     const {id}=req.params;
//     const {description}=req.body
//     const updating=await pool.query('UPDATE demo_todo SET description=$1 WHERE todo_id=$2',[description, id])
//     res.status(201).json('Updated new_todos')
// } catch (error) {
//     console.error(error);
// }
// })
// //delete a todo
// app.delete('/todos/:id',async(req,res)=>{
// try {
//     const {id}=req.params
//     const deleting=await pool.query('DELETE FROM demo_todo WHERE todo_id=$1',[id])
//     res.json('Deleted todo')
// } catch (error) {
//     console.error(error);
// }
// })
const route_to=require('./routes/routes')
app.use('/todos',route_to)
app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}`);
})