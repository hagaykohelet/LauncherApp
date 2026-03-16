import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddlauncherPage from './pages/AddlauncherPage'
import LauncherDetailsPage from './pages/launcherDetailsPage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-launcher' element={<AddlauncherPage />} />
        <Route path='/launcher-details' element={<LauncherDetailsPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
