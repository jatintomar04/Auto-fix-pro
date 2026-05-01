import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes , Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import {ToastContainer} from "react-toastify"
import Login from './pages/Login'
import Nav from './components/Nav'
import RaiseComplaints from './pages/RaiseComplaints'
import Allcomplaints from './pages/Allcomplaints'
import Footer from './components/Footer'
import PrivateComponent from './components/PrivateComponent'
import CarDetails from './pages/CarDetails'
import { Alluser } from './pages/Alluser'
const App = () => {
  return (
    <>
    <BrowserRouter>
    < Nav />
    <Routes>
    <Route path='/' element ={<Home />} />
      <Route path='/login' element ={<Login />} />
      <Route path='/register' element ={<RegisterPage />} />
      <Route path='/car' element ={<PrivateComponent />}>
      <Route path='raise-complaint' element ={<RaiseComplaints />} />
      <Route path='all-complaints' element ={<Allcomplaints />} />
      <Route path='complaint/:id' element ={<CarDetails />} />
      <Route path='/car/all-users' element ={<Alluser />} />

      </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
      
      
    </>
  )
}

export default App
