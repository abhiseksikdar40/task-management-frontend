import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './auth/LoginPage'

import App from './App'
import PrivateRoute from './auth/PrivateRoute'
import { TaskProvider } from './context/TaskContext'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Team from './pages/Team'
import Reports from './pages/Reports'
import User from './pages/User'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/login" element={<LoginPage loginMode={true} />} />
      <Route path="/signup" element={<LoginPage loginMode={false} />} />
        <Route element={<App/>}>
          <Route path='/auth/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/auth/tasks' element={<PrivateRoute><Tasks/></PrivateRoute>}/>
          <Route path='/auth/team' element={<PrivateRoute><Team/></PrivateRoute>}/>
          <Route path='/auth/teams/:id' element={<PrivateRoute><User/></PrivateRoute>}/>
          <Route path='/auth/reports' element={<PrivateRoute><Reports/></PrivateRoute>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </TaskProvider>
  </StrictMode>,
)
