import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Book from './Components/Book'
import Category from './Components/Category'
import AddGenre from './Components/AddGenre'
import AddBook from './Components/AddBook'
import EditBook from './Components/EditBook'
import Start from './Components/Start'
import BookDetail from './Components/BookDetail'
import PrivateRoute from './Components/PrivateRoute'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/ownerlogin' element={<Login />}></Route>

      <Route path='/home' element={<Home />}></Route>

  
      <Route path='/book_detail/:id' element={<BookDetail />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/book' element={<Book />}></Route>
        <Route path='/dashboard/genre' element={<Category />}></Route>
        <Route path='/dashboard/add_genre' element={<AddGenre />}></Route>
        <Route path='/dashboard/add_book' element={<AddBook />}></Route>
        <Route path='/dashboard/edit_book/:id' element={<EditBook />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
