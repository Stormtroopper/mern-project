import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Button,InputGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Edit from './Edit';



function Inputs() {
    const [description, setValidated] = useState("");
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = { description };
            const res = await fetch("http://localhost:5000/todos", {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(content)
            })
            window.location='/'
            console.log(res);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <h1 className='text-center mt-4 '>To Do List</h1>
            <Form onSubmit={HandleSubmit}>
            <InputGroup className="mb-3">

                <Form.Control
                    aria-label="Default"
                    value={description}
                    aria-describedby="inputGroup-sizing-default"
                    onChange={e=>setValidated(e.target.value)}
                />
            </InputGroup>
            <Button variant="success" type='submit'>Add</Button>
            </Form>
        </div>
    )
}

export default Inputs