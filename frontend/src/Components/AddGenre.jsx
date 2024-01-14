import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api'

const AddGenre = () => {
  const [genreName, setGenreName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasNumber = /\d/;
    if (hasNumber.test(genreName)) {
      setError('Cannot enter numbers in the genre name.');
      return;
    }

    api.addGenre({genreName})
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/genre');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border'>
        <h2>Add Genre</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="genre"><strong>Genre:</strong></label>
            <input
              type="text"
              name='genreName'
              placeholder='Enter a book genre'
              onChange={(e) => setGenreName(e.target.value)}
              className='form-control rounded-0'
            />
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add genre</button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default AddGenre;