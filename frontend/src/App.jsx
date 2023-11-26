import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import EditBooks from './pages/EditBooks'
import ShowBooks from './pages/ShowBooks'
import DeleteBooks from './pages/DeleteBooks'
function App() {


  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBooks />} />
        <Route path="/books/details/:id" element={<ShowBooks />} />
        <Route path="/books/edit/:id" element={<EditBooks />} />
        <Route path="/books/delete/:id" element={<DeleteBooks />} />

      </Routes>
    </>
  )
}

export default App
