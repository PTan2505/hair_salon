import { Routes, Route } from 'react-router-dom'
import './App.css'
import AdminNavbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import Customer from './customer/Customer'
import Appointment from './appointment/Appointment'

function App() {
  return (
    <>
      <AdminNavbar />
      <div className="layout-container">
        <Sidebar role='admin' />
        <div className="main-content">
          <Routes>
            <Route path={'/customer'} element={<Customer />}></Route>
            <Route path={'/appointment/:filter'} element={<Appointment />}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
