import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditGenre = () => {
  const [genre, setGenre] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editGenre, setEditGenre] = useState({ id: null, genreName: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    axios.get('http://localhost:3000/auth/genre')
      .then(result => {
        if (result.data.Status) {
          setGenre(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  };

  const handleEdit = (genre) => {
    setEditGenre(genre);
    setShowEditDialog(true);
  };

  const saveEditedGenre = () => {
    const hasNumber = /\d/;
    if (hasNumber.test(editGenre.genreName)) {
      setError('Cannot enter numbers in the genre name.');
      return;
    }

    axios.put(`http://localhost:3000/auth/edit_genre/${editGenre.id}`, { name: editGenre.genreName })
      .then(response => {
        setShowEditDialog(false);
        fetchGenres();
      }).catch(error => console.log(error));
  };

  const cancelEdit = () => {
    setShowEditDialog(false);
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Genre List</h3>
      </div>
      <Link to="/dashboard/add_genre" className='btn btn-success'>Add Genre</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {genre.map(c => (
              <tr key={c.id}>
                <td>{c.genreName}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => handleEdit(c)}>Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditDialog && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))',
          padding: '20px',
          zIndex: 1000,
          border: '1px solid black',
          borderRadius: '10px',
          color: 'white'
        }}>
          <h3>Edit Genre</h3>
          <input
            type="text"
            value={editGenre.genreName}
            onChange={(e) => setEditGenre({ ...editGenre, genreName: e.target.value })}
          />
          <div>
            <button
              style={{
                backgroundColor: 'white',
                color: 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))',
                border: '1px solid white',
                padding: '5px 10px',
                marginRight: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onClick={saveEditedGenre}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))';
              }}
            >
              Save
            </button>
            <button
              style={{
                backgroundColor: 'white',
                color: 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))',
                border: '1px solid white',
                padding: '5px 10px',
                marginTop: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onClick={cancelEdit}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))';
              }}
            >
              Cancel
            </button>
          </div>
          {error && <div style={{ color: 'yellow' }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default EditGenre;