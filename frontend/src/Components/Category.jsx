import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

    const [genre, setGenre] = useState([])
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editGenre, setEditGenre] = useState({ id: null, genreName: '' });

    useEffect(()=> {
        fetchGenres();
    }, [])

    const fetchGenres = () => {
        axios.get('http://localhost:3000/auth/genre')
        .then(result => {
            if(result.data.Status) {
                setGenre(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err));
    }

    const handleEdit = (genre) => {
        setEditGenre(genre);
        setShowEditDialog(true);
    };
    

    
    
    const saveEditedGenre = () => {
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
                        {
                            genre.map(c => (
                                <tr key={c.id}>
                                    <td>{c.genreName}</td>
                                    
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-info me-2"
                                            onClick={() => handleEdit(c)}>Edit
                                        </button>
                                      
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {showEditDialog && (
                <div style={{
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    zIndex: 1000,
                    border: '1px solid black'
                }}>
                    <h3>Edit Genre</h3>
                    <input 
                        type="text" 
                        value={editGenre.genreName} 
                        onChange={(e) => setEditGenre({...editGenre, genreName: e.target.value})} 
                    />
                    <div>
                        <button onClick={saveEditedGenre}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Category;
