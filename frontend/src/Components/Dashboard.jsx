import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import * as api from '../services/api'

const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    api.dashboardLogout()
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        navigate('/')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-danger d-flex flex-column justify-content-between vh-100">
          <div className="bg-danger text-white p-3 rounded shadow">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Home
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="home"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-house-door ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/book"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-book ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Book Store
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/genre"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-list-check ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Book Genre</span>
                </Link>
              </li>

              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow mb-3 bg-danger text-white">
            <h1
              className="display-1 text-center text-white"
              style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
            >
              Welcome to My Book Store
            </h1>
          </div>
          <div className="p-4 shadow bg-light rounded">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;