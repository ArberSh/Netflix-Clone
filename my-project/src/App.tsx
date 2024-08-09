import { useState } from 'react'
import './App.css'
import Introduction from '../src/Introduction'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';

function App() {

  const [FirstName,SetFirstName] = useState<string>('')
  const [LastName,SetLastName] = useState<string>('')

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Introduction SetFirstName={SetFirstName} SetLastName={SetLastName}/>}></Route>
        <Route path='/HomePage' element={<HomePage FirstName={FirstName} LastName={LastName} />}> </Route>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
