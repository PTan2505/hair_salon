import { Routes, Route } from 'react-router-dom'
import './App.css'
import AdminNavbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import CustomerManagement from './customerManagement/CustomerManagement'

function App() {
  return (
    <>
      <AdminNavbar />
      <div className="layout-container">
        <Sidebar role='admin' />
        <div className="main-content">
          <Routes>
            <Route path={'/customerManagement'} element={<CustomerManagement />}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
