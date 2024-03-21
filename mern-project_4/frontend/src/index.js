import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './Error';
import { Provider } from 'react-redux';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home'
import { store } from "./store"
const router = createBrowserRouter([
  {
    path: '/',
    element: <Provider store={store}>

      <App />,
    </Provider>
    ,
    errorElement: <Error />,
  }, {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  }, {
    path: '/signup',
    element: <SignUp />,
    errorElement: <Error />,
  }
  , {
    path: '/user',
    element: <Home />,
    errorElement: <Error />,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals