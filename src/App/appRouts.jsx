import { Route, Routes } from 'react-router-dom'
import NotFound from '../notFound'
import Search from './search'
import LibraryPage from './libraryPage'
import WordPage from './wordPage'

function AppRouts() {
  
  return (
    <Routes>
      <Route path='/' element={<Search/>} />
      <Route path='/word' element={<WordPage/>} />
      <Route path='/library' element={<LibraryPage/>} />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  )
}
export default AppRouts
