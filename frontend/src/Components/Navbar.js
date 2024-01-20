import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Home/Login';
import logo from '../images/OmniCareLogo.png';

export default function NavBar() {
    const [isLogin,setIsLogin]=useState(false);
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-rgba p-0 position-fixed" id='nav'>
            <div className="container-fluid p-2">
                <div className="d-flex" id='logocontainer'>
                    <div className="m-0" id='logobox'>
                        <Link className="navbar-brand" href="/">
                            <img width={"175px"} src={logo} alt="" />
                        </Link>
                    </div>
                </div>
                <button className="navbar-toggler pe-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse p-0   " id="navbarSupportedContent">
                    <div className="row w-100 m-0 p-2 ">
                        <div className="col-12 col-lg-12">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                                <li className="nav-item text-center">
                                    <Link className="nav-link py-1 fs-6 text-white nav-border" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item text-center">
                                    <Link className="nav-link py-1 fs-6 text-white nav-border" to="/about">
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item text-center">
                                    <Link className="nav-link py-1 fs-6 text-white nav-border" to="/">
                                        Services
                                    </Link>
                                </li>
                                <li className="nav-item text-center">
                                    <Link className="nav-link py-1 fs-6 text-white nav-border" onClick={()=>{setIsLogin(true)}}>
                                        Sign in
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        {
            isLogin?
            <Login/>:
            ''
        }
        </>
    );
}
