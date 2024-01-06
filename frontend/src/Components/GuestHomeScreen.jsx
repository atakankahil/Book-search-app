import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const GuestHomeScreen = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = () => {
    axios.get('http://localhost:3000/auth/book')
      .then(result => {
        if (result.data.Status) {
          setBooks(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col p-0 m-0">
          <div className="p-3 d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleGoBack}
            >
              <BsArrowLeft size={24} /> Go Back
            </button>
          </div>

          <div className="mt-4 px-5 pt-3 w-100">
            <h3>List of Books</h3>
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
                {books.map(a => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.author}</td>
                    <td>{a.genreName}</td>
                    <td>{a.year}</td>
                    <td>{a.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestHomeScreen;
