// import React, { useState } from 'react'
// import GoingBack from '../components/GoingBack';
// import axios from 'axios';
// import Spinner from '../components/Spinner';
// import { useNavigate } from 'react-router-dom';

// const [title, setTitle] = useState('');
// const [author, setAuthor] = useState('');
// const [published, setPublished] = useState('');
// const [loading, setLoading] = useState(false);
// const navigating = useNavigate();
// const SaveBooks = () => {
//     let data = {
//         title,
//         author,
//         published,
//     };
//     const onSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Form Data', formData);
//         // call the api here to save the book data
//     };

//     setLoading(true);
//     axios.post('http://localhost:5555/books', data)
//         .then(() => {
//             setLoading(false);
//             navigating('/');
//         })
//         .catch((e) => {
//             setLoading(false);
//             console.log(e);
//         })
// };
// function CreateBooks() {
//     return (
//         <div className='p-5'>
//             <GoingBack />
//             <h1 className='text-xl'>Create</h1>
//             {loading ? <Spinner /> : ''}
//             <div className="bg-gray-100 min-h-screen p-5">
//                 <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Book Title
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             name="title"
//                             value={title}
//                             onChange={(e) => { setTitle(e.target.value) }}
//                             type="text"
//                             placeholder="Book Title"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Author
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             name="author"
//                             value={author}
//                             onChange={(e) => { setAuthor(e.target.value) }}
//                             type="text"
//                             placeholder="Author"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Publication Year
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             name="publicationYear"
//                             value={published}
//                             onChange={(e) => { setPublished(e.target.value) }}
//                             type="number"
//                             placeholder="Publication Year"
//                         />
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                             type="submit" onClick={SaveBooks}
//                         >
//                             Add Book
//                         </button>
//                     </div>
//                 </form>
//             </div>


//         </div>
//     )
// }

// export default CreateBooks
import React, { useState } from 'react';
import GoingBack from '../components/GoingBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            published,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/books', data)
            .then(() => {
                setLoading(false);
                alert('Book Created successfully');
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Chack console');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <GoingBack />
            <h1 className='text-3xl my-4'>Create Book</h1>
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
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default CreateBooks;