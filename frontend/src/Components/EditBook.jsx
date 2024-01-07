import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const { id } = useParams()
  const [book, setBook] = useState({
    name: "",
    author: "",
    genre_id: "",
    year: "",
    price: "",
  });
  const [genre, setGenre] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/genre')
      .then(result => {
        if (result.data.Status) {
          setGenre(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))

    axios.get('http://localhost:3000/auth/book/' + id)
      .then(result => {
        setBook({
          ...book,
          name: result.data.Result[0].name,
          author: result.data.Result[0].author,
          genre_id: result.data.Result[0].genre_id,
          year: result.data.Result[0].year,
          price: result.data.Result[0].price,

        })
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_book/' + id, book)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/book')
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Book</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Book Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={book.name}
              onChange={(e) =>
                setBook({ ...book, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAuthor" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAuthor"
              placeholder="Enter Author"
              autoComplete="off"
              value={book.author}
              onChange={(e) =>
                setBook({ ...book, book: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="genre" className="form-label">
              Genre
            </label>
            <select name="genre" id="genre" className="form-select"
              onChange={(e) => setBook({ ...book, genre_id: e.target.value })}>
              {genre.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.genreName}
                </option>
              ))}
            </select>
          </div>
          <div className='col-12'>
            <label for="inputYear" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputYear"
              placeholder="Enter Year"
              autoComplete="off"
              value={book.year}
              onChange={(e) =>
                setBook({ ...book, year: e.target.value })
              }
            />
          </div>

          <div className='col-12'>
            <label for="inputPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputPrice"
              placeholder="Enter Year"
              autoComplete="off"
              value={book.price}
              onChange={(e) =>
                setBook({ ...book, price: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook