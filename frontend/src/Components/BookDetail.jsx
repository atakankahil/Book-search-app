import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const BookDetail = () => {
    const [book, setBook] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/book/detail/'+id)
        .then(result => {
            setBook(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
 
  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Book Management System</h4>
      </div>

      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <div className="card p-4 rounded border shadow">
          <h2 className="text-center mb-4">{book.name}</h2>
          <div className="d-flex flex-column align-items-center">
            <h5><strong>Author:</strong> {book.author}</h5>
            <h5><strong>Genre:</strong> {book.genre}</h5>
            <h5><strong>Year:</strong> {book.year}</h5>
            <h5><strong>Price:</strong> ${book.price}</h5>
          </div>
        </div>
      </div>

      <div>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default BookDetail