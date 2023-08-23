import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Add from './Pages/Add';
import Update from './Pages/Update';

function App() {
  return (
    <div className="App">
      <h1 className=' text-center text-6xl m-10'>MERN CRUD App</h1>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/add' element={<Add/>} />
          <Route path='/update/:id' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
