import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddlauncherPage from './pages/AddlauncherPage'
import LauncherDetailsPage from './pages/launcherDetailsPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './Providers/ProtectedRoute'
import './App.css'
import RegisterPage from './pages/RegisterPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route element={<ProtectedRoute />} >
            <Route path='/home' element={<HomePage />} />
            <Route path='/add-launcher' element={<AddlauncherPage />} />
            <Route path='/launcher-details' element={<LauncherDetailsPage />} />
            <Route path='/registerNewUser' element={<RegisterPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
