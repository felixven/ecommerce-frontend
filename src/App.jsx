import React, { useState } from 'react'
import './App.css'
import Products from './components/products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NavBar from './components/shared/NavBar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import Cart from './components/cart/Cart';
import LogIn from './components/auth/LogIn';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/auth/Register';
import Checkout from './components/checkout/Checkout';
import PaymentConfirmation from './components/checkout/PaymentConfirmation';
import { ThemeProvider } from '@mui/material';
import theme from "./theme"; 
import LinepayConfirm from './components/checkout/LinePayConfirm';
import OrderHistory from './components/order/OrderHistory';
import OrderSuccess from './components/checkout/OrderSuccess';


function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/linepay/confirm' element={<LinepayConfirm />} />
          <Route path='/orders' element={<OrderHistory/>}/>
        <Route path="/orders/:orderId/success" element={<OrderSuccess />} />

          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-confirm' element={<PaymentConfirmation/>} /> 
          </Route>

          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position='bottom-center' />
      </ThemeProvider>
    </React.Fragment>

  )
}

export default App
