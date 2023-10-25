import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './App/appLayout'
import ProtectedRoute from './protectedRoute'
import AuthLayout from './Auth/authLayout'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='auth/*' element={<AuthLayout/>} />
      <Route path='/*' element={ <ProtectedRoute Component={AppLayout}/> }/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
