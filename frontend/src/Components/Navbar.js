import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Home/Login';
import logo from '../images/OmniCareLogo.png';
import Cookie from 'js-cookie';
import axios from 'axios';
import { requestedURL } from '../urls';
import profile from "../images/Userprofile.png";
import { useDispatch } from 'react-redux';
import { userData } from '../store/userSlice';

export default function NavBar() {
    const [isLogin,setIsLogin] = useState(false);
    const [navItem,setNavItem] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var role='';
    const logout=()=>{
        Cookie.set('Login_Jwt_token','');
        window.location.reload();
    }
    useEffect(()=>{
        const verify=async()=>{
        const token= Cookie.get('Login_Jwt_token');
        if(token){
         var result=await axios.post(requestedURL+'/awt_login',{token});
         if(result.status===201){
            console.log('result in navbar in ',result);
            setNavItem(
            <>
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
                <li className="nav-item text-center dropdown">
                    <button className='w-100 p-2 bg-dark dropdown-toggle' type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user fs-3 text-light"></i>
                    </button>
                    <ul className='dropdown-menu dropdown-menu-dark'>
                        <li>
                            <Link className='dropdown-item' to={(result.data.role==='Customer')?'/customer_profile':'/Service_provider_profile'}>Profile</Link>
                        </li>
                        <li>
                            <a className='dropdown-item' style={{cursor:'pointer'}} onClick={()=>{logout()}}>Log Out</a>
                        </li>
                    </ul>
                </li>
            </>
          )
         }else{
            setNavItem(
                <>
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
                </>
            )
         }
        }else{
            setNavItem(
                <>
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
                </>
            )
        }
    }    
        verify();
      },[]
    )
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
                                {/* <li className="nav-item text-center">
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
                                </li> */}
                                {navItem}
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
