import { useState } from 'react'
import './App.css'
import Introduction from '../src/Introduction'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Introduction/>}></Route>
        <Route path='/HomePage' element={<HomePage/>}> </Route>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
