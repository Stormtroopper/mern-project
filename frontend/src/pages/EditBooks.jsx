import React, { useState, useEffect } from 'react';
import GoingBack from '../components/GoingBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/${id}`)
            .then((res) => {
                setAuthor(res.data.author);
                setTitle(res.data.title);
                setPublishYear(res.data.published);
                setLoading(false);
            }).catch((e) => {
                setLoading(false);
            })
    }, [])
    const EditSaveBook = () => {
        const data = {
            title,
            author,
            published,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                alert('Book Created successfully');
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check console');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <GoingBack />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='bg-gray-100 min-h-screen p-5'>
                <div className='my-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='my-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                    />
                </div>
                <div className='my-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Publish Year</label>
                    <input
                        type='number'
                        value={published}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={EditSaveBook}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditBooks;