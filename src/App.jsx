import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthWrap from './auth/AuthWrap';
import GuestWrap from './auth/GuestWrap';
import Detail from './pages/Detail';
import Home from './pages/Home';
import { Listing } from './pages/Listing';
import { Login } from './pages/Login';
import OrderList from './pages/OrderList';
import { Register } from './pages/Register';
import ViewOrders from './pages/ViewOrders';

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
       <Route path='/book/:bookId' element={
        <AuthWrap>
          <Detail/>
        </AuthWrap>
       }/>
       <Route path='/book/orders' element={
        <AuthWrap>
          <ViewOrders/>
        </AuthWrap>
        }/>
       <Route path='/book/order/:id' element={
        <AuthWrap>
          <OrderList/>
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