import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './auth/LoginPage'

import App from './App'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Team from './pages/Team'
import Reports from './pages/Reports'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/login" element={<LoginPage loginMode={true} />} />
      <Route path="/signup" element={<LoginPage loginMode={false} />} />
        <Route element={<App/>}>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/project' element={<PrivateRoute><Project/></PrivateRoute>}/>
          <Route path='/team' element={<PrivateRoute><Team/></PrivateRoute>}/>
          <Route path='/reports' element={<PrivateRoute><Reports/></PrivateRoute>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
