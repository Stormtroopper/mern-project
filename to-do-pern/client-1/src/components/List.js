import React, { useEffect, useState } from 'react'
import Edit from './Edit';
function List() {
    const [todos,setTodos]=useState([]);

    const delete_todo=async(id)=>{
        try {
            let deleting=await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            })
            setTodos(todos.filter(todo=>todo.id!==id))
            console.log(deleting);
        } catch (error) {
            console.log(error.message);
        }
    }


    const get_Todos = async () => {
        try {
            const res = await fetch("http://localhost:5000/todos")
            const json_Data = await res.json();
            setTodos(json_Data);
        } catch (e) {
            console.error(e.message);
        }
    }
    useEffect(()=>{
        get_Todos();
    },[]);
    return (
        <div>
            <table className='table table-hover mt-4'>
                <thead>
                    <tr >
                       
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {todos.map(todo=>(
                            <tr key={todo.todo_id}>
                                
                                <td>{todo.description}</td>
                                <td><Edit todo={todo}/></td>
                                <td><button className='btn btn-danger btn-md' onClick={()=>delete_todo(todo.todo_id)} >Delete</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>

    )
}

export default List