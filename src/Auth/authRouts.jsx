import { Route, Routes } from 'react-router-dom'
import SignUp from './signUp'
import NotFound from '../notFound'
import RequestPassword from './requestPassword'
import Login from './logIn'

function AuthRouts() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path="signup" element={<SignUp/>} />
      <Route path="request" element={<RequestPassword/>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    </>
  )
}
export default AuthRouts