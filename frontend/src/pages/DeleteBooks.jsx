// import React from 'react'
// import GoingBack from '../components/GoingBack';
// import Spinner from '../components/Spinner';
// import axios from "axios"
// import { useNavigate, useParams } from 'react-router-dom';
// import { useState } from 'react';
// function DeleteBooks() {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const deleteBooks = () => {
//         setLoading(true);
//         axios.delete(`http://localhost:5555/books/${id}`)
//             .then(() => {
//                 setLoading(false);
//                 navigate('/')
//             }).catch((e) => {
//                 setLoading(false);
//                 console.log(e);
//                 alert('Book is not deleted')
//             })
//     }
//     return (
//         <div className='p-5'>
//             <GoingBack />
//             <h1 className='text-2xl my-3'> Delete Books</h1>
//             {loading ? <GoingBack /> : ''}
//             <div className='bg-gray-100 min-h-screen p-5'>
//                 <h3 className='text-2xl'>Do you wanna delete this book?</h3><br></br>
//                 <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={deleteBooks}>
//                     Delete
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default DeleteBooks
import React, { useState } from 'react';
import GoingBack from '../components/GoingBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please Chack console');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <GoingBack />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    )
}

export default DeleteBook;