import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Users from './components/Users/Users'

function App() {
  return (
    <>
      <Users/>
      <ToastContainer/>
    </>
  )
}

export default App
