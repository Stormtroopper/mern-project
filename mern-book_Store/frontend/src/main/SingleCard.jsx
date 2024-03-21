import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
function SingleCard({ book }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-1 m-4 relative hover:shadow-xl'>
      <h1 className='text-center text-lg fw-bolder'>Book Details</h1><br />

      <div className='flex-col justify-start items-center gap-x-2 py-2'>
        <h2 className='d-flex'>
          Year Published:  <b>{book.Year_published}</b>
        </h2>
        <h2 className='d-flex flex-wrap'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          Title: <b>{book.title}</b></h2>
        <h2 className='my-1'>Author:<b> {book.author}</b></h2>
      </div>

      <div className='d-flex justify-between items-center  mt-4 '>

        <h1 className='d-flex'> <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />Show</h1>
        <Link to={`/books/details/${book._id}`}>

          <h1 className='d-flex'> <BsInfoCircle
            className='text-3xl text-blue-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
          />Info</h1>
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <h1 className='d-flex'> <AiOutlineEdit
            className='text-3xl text-blue-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
          />Edit</h1>
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <h1 className='d-flex'> <MdOutlineDelete
            className='text-3xl text-blue-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
          />Delete</h1>
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default SingleCard