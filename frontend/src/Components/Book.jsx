import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../services/api"

const Book = () => {
  const [book, setBook] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
      api.getBook()
      .then((result) => {
        if (result.data.Status) {
          setBook(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    api.deleteBook(id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>My Book List</h3>
      </div>
      <Link to="/dashboard/add_book" className="btn btn-success">
        Add Book
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {book.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.author}</td>
                <td>{e.genreName}</td>
                <td>{e.year}</td>
                <td>{e.price}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_book/` + e.id}
                    className="btn btn-sm btn-outline-info me-2"
                  >
                    Edit Book
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete Book
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Book;
