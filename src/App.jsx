import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthWrap from './auth/AuthWrap';
import GuestWrap from './auth/GuestWrap';
import { useFirebase } from './context/Firebase'
import Home from './pages/Home';
import { Listing } from './pages/Listing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const App = () => {
  return (
     <Routes>
       <Route path='/' element={
        <AuthWrap>
          <Home/>
        </AuthWrap>
       }/>
       <Route path='/book/list' element={
        <AuthWrap>
          <Listing/>
        </AuthWrap>
       }/>
       <Route path='/login' element={
        <GuestWrap>
          <Login/>
        </GuestWrap>
       }/>
       <Route path='/register' element={
        <GuestWrap>
          <Register/>
        </GuestWrap>
       }/>
     </Routes>
  )
}

export default App