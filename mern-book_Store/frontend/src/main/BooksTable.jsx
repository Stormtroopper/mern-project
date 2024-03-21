import { Pencil, Info,  XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const BooksTable=({books})=>{

<TableContainer component={Paper}className='table'>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Published_Year</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Operations</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {books.map((book, id) => (
                <TableRow
                    key={book._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {id + 1}
                    </TableCell>
                    <TableCell align="right">{book.title}</TableCell>
                    <TableCell align="right">{book.Year_published}</TableCell>
                    <TableCell align="right">{book.author}</TableCell>
                    <TableCell align="right">
                        <div className="flex justify-center gap-x-4">
                            <Link to={`/books/details/${book._id}`}><Info /></Link>
                        </div>
                        <div className="flex justify-center gap-x-4">
                            <Link to={`/books/edit/${book._id}`}><Pencil /></Link>
                        </div>
                        <div className="flex justify-center gap-x-4">
                            <Link to={`/books/delete/${book._id}`}><XCircle /></Link>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
}
export default BooksTable