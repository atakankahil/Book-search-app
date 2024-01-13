import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookTable = ({ books }) => (
  <table className="table table-hover">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Author</th>
        <th scope="col">Genre</th>
        <th scope="col">Year</th>
        <th scope="col">Price</th>
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
  <div className="px-3 pt-2 pb-3 border shadow-sm bg-light">
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
    const url = `http://localhost:3000/auth/search_books${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`;
    try {
      const response = await axios.get(url);
      if (response.data.Status) {
        const filteredBooks = response.data.Result.filter(book =>
          book.name.toLowerCase() === searchQuery.toLowerCase() ||
          book.genreName.toLowerCase() === searchQuery.toLowerCase() ||
          book.author.toLowerCase() === searchQuery.toLowerCase()
        );
        setBooks(filteredBooks);
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
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">List of Books</h3>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for books by name, author, or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="button" onClick={handleSearch}>
                  <i className="bi bi-search"></i> Search
                </button>
                <button className="btn btn-secondary" type="button" onClick={handleClearSearch}>
                  <i className="bi bi-x"></i> Clear
                </button>
              </div>
              <BookTable books={books} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <BookSummary bookTotal={bookTotal} />
        </div>
      </div>
    </div>
  );
};

export default Home;
