import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
     <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '10px', padding: '20px 10px', width: '100%' }}>
          <Outlet />
        </main>
        </div>
    </>
  )
}

export default App
