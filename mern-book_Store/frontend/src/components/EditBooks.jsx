
import React, { useState, useEffect } from 'react';
import Back_Button from '../components/Back_Button';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Form from 'react-bootstrap/Form';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function EditBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [Year_published, setPublishYear] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/books/${id}`)
    .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.Year_published)
        setTitle(res.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      Year_published,
      description
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
     
        enqueueSnackbar('Error', { variant: 'error' });
      });
  };

  return (
   <Card sx={{ maxWidth: 900 }} className=''>
      <CardContent>
        <Back_Button/>
        <Typography gutterBottom variant="h5" component="div" style={{
          textAlign:"center"
        }}>
          Edit Books
        </Typography>
        {loading ? <Spinner /> : ''}
        <Typography  variant="h6" component="div">
         Title<br></br>

          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{
            border:"2px solid black",
            cursor:"pointer",
           
          }}
          />
        </Typography>
        <Typography variant="h6" color="text.dark">
       Author <br></br>
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          style={{
            border:"2px solid black",
            cursor:"pointer",
          }}/>
        </Typography>
        <Typography variant="h6" color="text.dark">
        Published Year <br></br>
        <input
          type="number"
          onChange={(e) => setPublishYear(e.target.value)}
          value={Year_published}
          style={{
            border:"2px solid black",
            cursor:"pointer",
          }}/>
        </Typography>
        <Typography variant="h6" color="text.dark">
        Description <br></br>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          style={{
            border:"2px solid black",
            cursor:"pointer",
          }}/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEditBook}>Edit</Button>
      </CardActions>
    </Card>
  )
}

export default EditBooks