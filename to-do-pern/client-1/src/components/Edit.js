import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal,InputGroup,Form } from 'react-bootstrap';
import { useState } from 'react';
function Edit({todo}) {
  console.log(todo);
  const [show, setShow] = useState(false);
  const [description,setdescription]=useState(todo.description)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateDescription=async e=> {
    try {
      const desc={description}
      const bd=await fetch(`http://localhost:5000/todos/${todo.todo_id}`,
      {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(desc)
    })
    window.location='/'
    console.log(bd);
    } 
    catch (error) {
    console.error(error.message);
    }
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={()=>setdescription(todo.description)}>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">

            <Form.Control
              aria-label="Default"
              value={description}
              aria-describedby="inputGroup-sizing-default"
              onChange={e=>setdescription(e.target.value)}
            />
          </InputGroup></Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={e=>updateDescription()}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit