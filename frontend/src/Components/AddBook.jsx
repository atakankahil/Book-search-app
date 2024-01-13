import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    genre_id: "",
    year: "",
    price: "",
  });
  
  const [genre, setGenre] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/genre")
      .then((result) => {
        if (result.data.Status) {
          setGenre(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const specialCharsRegex = /[!@#$%^&*(),?":{}|<>]/;
    if (specialCharsRegex.test(book.name) || specialCharsRegex.test(book.author)) {
      setError('No special characters allowed in Name or Author.');
      return;
    }

    if (parseFloat(book.price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    if (parseInt(book.year) < 0) {
      setError("Year cannot be negative.");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (parseInt(book.year) > currentYear) {
      setError("Year cannot be more than the current year.");
      return;
    }

    if (!book.name || !book.author || book.genre_id === "" || !book.year || !book.price) {
      setError("Please fill in all the fields.");
      return;
    }

    axios
      .post("http://localhost:3000/auth/add_book", {
        name: book.name,
        author: book.author,
        genre_id: book.genre_id,
        year: book.year,
        price: book.price,
      })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/book");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-4 rounded w-50 border bg-light">
        <h3 className="text-center text-dark">Add Book</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter book name"
              onChange={(e) => setBook({ ...book, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAuthor" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAuthor"
              placeholder="Enter author name"
              autoComplete="off"
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <select
              name="genreName"
              id="genreName"
              className="form-select"
              onChange={(e) =>
                setBook((prevBook) => ({
                  ...prevBook,
                  genre_id: +e.target.value,
                }))
              }
            >
              <option value="">Select a genre</option>
              {genre.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.genreName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="inputYear" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputYear"
              placeholder="2023"
              autoComplete="off"
              onChange={(e) => setBook({ ...book, year: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPrice" className="form-label">
              Price
            </label>
            <div className="input-group">
              <span className="input-group-text" id="price-addon">$</span>
              <input
                type="number"
                className="form-control rounded-0"
                id="inputPrice"
                placeholder="10"
                autoComplete="off"
                onChange={(e) => setBook({ ...book, price: e.target.value })}
                aria-describedby="price-addon"
              />
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Add Book
            </button>
          </div>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default AddBook;
