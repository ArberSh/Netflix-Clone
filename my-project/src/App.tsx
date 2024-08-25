import { useState } from 'react'
import './App.css'
import Introduction from '../src/Introduction'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Account from './Account';
import InfoMovies from './InfoMovies';

function App() {

  const [FirstName,SetFirstName] = useState<string>('')
  const [LastName,SetLastName] = useState<string>('')
  const [Email,SetEmail] = useState<string>('')

  console.log(FirstName + ' ' + LastName + ' ' + Email )

  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Introduction SetFirstName={SetFirstName} SetLastName={SetLastName} SetEmail1={SetEmail}/>}></Route>
        <Route path='/HomePage' element={<HomePage/>}> </Route>
        <Route path='/Account' element={<Account FirstName={FirstName} LastName={LastName} Email={Email}/>}></Route>
        <Route path='/InfoMovie' element={<InfoMovies/>}></Route>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
