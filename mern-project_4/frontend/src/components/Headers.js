import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react';
import { AppBar, Box, Toolbar, Tab, Typography, Tabs } from '@mui/material'
import { useSelector } from 'react-redux';
const Headers = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [signin, setsignin] = useState();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant='h2'>
            Login App using Mern Authentication
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs onChange={(e, signin) =>
              setsignin(signin)
            } value={signin} textColor="inherit">
              {/* <ul>
                <li>
                  <Link to={`/login`}>Login</Link>
                </li>
                <li>
                  <Link to={`/signup`}>SignUp</Link>
                </li>
              </ul> */}
              <Tab to='/login' LinkComponent={Link} label='Login' />
              {isLoggedIn &&
                <Tab to='/signup' LinkComponent={Link} label='SignUp' />}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div >
  )
}

export default Headers