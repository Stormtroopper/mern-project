import './App.css';
import Home from './components/Home';
import ShowBooks from './components/ShowBooks';
import DeleteBooks from './components/DeleteBooks';
import CreateBooks from './components/CreateBooks';
import EditBooks from './components/EditBooks'
import {  Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books/create' element={<CreateBooks />} />
          <Route path='/books/details/:id' element={<ShowBooks />} />
          <Route path='/books/edit/:id' element={<EditBooks />} />
          <Route path='/books/delete/:id' element={<DeleteBooks />} />
        </Routes>
    </>
  );
}

export default App;
