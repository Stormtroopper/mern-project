import { React, useState } from 'react'
import Headers from './Headers'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Box, TextField, Button, Typography } from '@mui/material'
const Login = () => {
  const hist = useNavigate();
  const [val, setval] = useState({

    email: "",
    password: "",
  })
  const HandleChange = (e) => {
    setval(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    })
    )
    console.log(e.target.name, "value", e.target.value);
  }
  const sendrequest = async () => {
    const res = axios.post('http://localhost:5000/api/login', {

      email: val.email,
      password: val.password
    }).catch(e => console.log(e));
    const data = await res.data;
    return data;
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    sendrequest().then(() => hist("/user"));

    console.log(val);
  }
  return (
    <div>
      <Headers />
      <form onSubmit={HandleSubmit}
      >
        <Box marginLeft="auto" marginRight="auto" width={300} display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
          <Typography variant='h4'>Login</Typography>

          <TextField name='password' onChange={HandleChange} value={val.password} margin="normal" type='password' label="Password" /><br /><br />
          <TextField name='email' onChange={HandleChange} value={val.email} margin="normal" type='email' label="Email" /><br /><br />
          <Button type="submit" variant="contained">Submit</Button>
        </Box>
      </form>

    </div>
  )
}

export default Login