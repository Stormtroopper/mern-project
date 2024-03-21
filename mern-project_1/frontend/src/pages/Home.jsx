import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

function Home() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            })
    }, []);
    return (
        <div className='p-5'>
            <div className='flex justify-center items-center gap-x-4'>
                <button className='bg-sky-300 hover:bg-sky-500 px-4 py-1 rounded-lg'>
                    Grid
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl my-6'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-450 text-5xl' />
                </Link>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <Table striped bordered hover className='w-full border-seperate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md'>Author</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Published</th>
                            <th className='border border-slate-600 rounded-md '>Operations </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className="h-6">
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {book.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {book.author}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {book.published}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${books._id}`}  >
                                            <BsInfoCircle className='text-2xl text-green-600' />
                                        </Link>
                                        <Link to={`/books/edit/${books._id}`}  >
                                            <AiOutlineEdit className='text-2xl text-blue-600' />
                                        </Link>
                                        <Link to={`/books/delete/${books._id}`}  >
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            )
            }
        </div >
    )
}

export default Home
