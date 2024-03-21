import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import BooksTable from '../main/BooksTable'
import BooksCard from '../main/BooksCard'
import { ShieldPlus } from 'lucide-react'
import '../App.css'
function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('TableContainer');
    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            }).catch((e) => {
                console.error(e);
                setLoading(false)
            })
    }, [])
    return (

        <div class="container-fluid"style={{ width: "100vw",padding:'0'}}>
            <h1 align="center" style={{ width: "100vw", fontSize: '2.4rem', fontWeight: 500, height: '10%', backgroundColor: 'green' }}>Book Store </h1>
            <Link to='/books/create'>
                <h1 align="center"style={{
                    fontWeight:500,
                    fontSize:'1.06rem',
                    paddingTop:'6px'
                }}>
                    <ShieldPlus width="30" height="24" class=" d-inline-block align-text-center" />

                    Create a New</h1>
            </Link>
            {loading ? (
                <Spinner />
            ) : showType === 'Table' ? (
                <BooksTable books={books} />
            ) : (
                <BooksCard books={books} />
            )}
        </div>
    );
}

export default Home