import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookTable = ({ books }) => (
  <table className="table w-100">
    <thead>
      <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Year</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {books.map((a) => (
        <tr key={a.id}>
          <td>{a.name}</td>
          <td>{a.author}</td>
          <td>{a.genreName}</td>
          <td>{a.year}</td>
          <td>${a.price}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const BookSummary = ({ bookTotal }) => (
  <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
    <div className="text-center pb-1">
      <h4>Book</h4>
    </div>
    <hr />
    <div className="d-flex justify-content-between">
      <h5>Total:</h5>
      <h5>{bookTotal}</h5>
    </div>
  </div>
);

const Home = () => {
  const [bookTotal, setBookTotal] = useState(0);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookCount();
    fetchAllBooks();
  }, []);

  const fetchBookCount = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/book_count');
      if (response.data.Status) {
        setBookTotal(response.data.Result[0].book);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      console.error('Error fetching book count:', err);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/book');
      if (response.data.Status) {
        setBooks(response.data.Result);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      console.error('Error fetching all books:', err);
    }
  };

  const fetchSearchedBooks = async () => {
    const url = `http://localhost:3000/auth/search_books${searchQuery ? `?search=${searchQuery}` : ''}`;
    try {
      const response = await axios.get(url);
      if (response.data.Status) {
        setBooks(response.data.Result);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      console.error('Error fetching searched books:', err);
    }
  };

  const handleSearch = () => {
    fetchSearchedBooks();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchAllBooks();
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col p-0 m-0">
          <div className="p-3 d-flex justify-content-around mt-3">
            <div className="mt-4 px-5 pt-3 w-100">
              <h3>List of Books</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                  <i className="bi bi-search"></i>
                </button>
                <button className="btn btn-outline-secondary" type="button" onClick={handleClearSearch}>
                  <i className="bi bi-x"></i>
                </button>
              </div>
              <BookTable books={books} />
            </div>
            <BookSummary bookTotal={bookTotal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
