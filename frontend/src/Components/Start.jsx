import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
useEffect
import * as api from '../services/api'

const Start = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    api.verifyOwner()
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard')
          }
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 rounded w-50 border shadow login-form">
        <h2 className="text-center mb-4">Please Login</h2>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-success me-3"
            onClick={() => { navigate('/ownerlogin') }}
          >
            Administrator
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => { navigate('/home') }}
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
