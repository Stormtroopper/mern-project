import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from './Spinner';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Back_Button from './Back_Button';
export default function CreateBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [Year_published, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      Year_published,
      description
    };
    setLoading(true);
    axios
      .post('http://localhost:5000/books', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <Card sx={{ maxWidth: 900 }} style={{
      margin:"auto"
    }}>
      <CardContent>
        <Back_Button/>
        <Typography gutterBottom variant="h5" component="div" style={{
          textAlign:"center"
        }}>
          Create Books
        </Typography>
        {loading ? <Spinner /> : ''}
        <Typography gutterBottom variant="h6" component="div">
         Title<br></br>

          <Form.Control
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          style={{
            border:"2px solid black",
            cursor:"pointer",
            fontFamily:"fantasy"
          }}
        />
        </Typography>
        <Typography variant="h6" color="text.dark">
        Author <br></br>
        <Form.Control
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{
            border:"2px solid black",
            cursor:"pointer",
          }}/>
        </Typography>
        <Typography variant="h6" color="text.dark">
        Published Year <br></br>
        <Form.Control
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
        <Form.Control
          type="textarea"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          style={{
            border:"2px solid black",
            cursor:"pointer",
          }}/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" href='https://in.pinterest.com/search/pins/?q=books&rs=typed' target='_blank'>Learn More</Button>
        <Button size="small" onClick={handleSaveBook}>Save</Button>
      </CardActions>
    </Card>
  );
}
