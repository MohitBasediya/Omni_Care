import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ServiceProvider from './Provider.js';
import UserReview from './UserReview.js';
import AddServices  from './AddServices.js';
import CancelOrder  from './CancelOrder.js';
import Order  from './Order.js';
import Services from "./Service.js";
import Customer from './Customer.js';
import React, { useState } from "react";
import axios from "axios";
import { memo } from "react";
import { adminURl } from "../../urls";
import Swal from "sweetalert2";
import Booking from './Booking.js';
import "./styles.css";

function AdminNav() {
    const [show, setShow] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [admincomponent,setAdminComponent] = useState('homedata');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInput = (e) => {
        setServiceType(e.target.value);
    }
    const addServiceType = async (e) => {
        e.preventDefault();
        console.log('service type : ',serviceType);
        try {
            if (serviceType === '') {
                alert('field is empty');
                return false;
            } else {
                var response = await axios.post(adminURl + '/addservicetype', { serviceType });
                console.log('response', response)
                if (response.status === 201) {
                    // alert('service added sucessfully');
                    Swal.fire({
                        icon: 'success',
                        text: 'Service Added Successfully',
                        timer: 2000
                    });
                    handleClose();
                }
                else if(response.status===203){
                    Swal.fire(`${serviceType} service is already exist`);
                }
                else if(response.status===500){
                    Swal.fire(`${response.data.error}`);
                }
            }
        } catch (err) {
            console.log('err : ', err);
        }
    }

    return (
        <>
            <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                    <div className="container-fluid">
                        <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" to="#">
                            {/* <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" alt="..."/> */}
                        </Link>
                        <div className="navbar-user d-lg-none">
                            <div className="dropdown">
                                <Link to="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="avatar-parent-child">
                                        <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar- rounded-circle" />
                                        <span className="avatar-child avatar-badge bg-success"></span>
                                    </div>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                                    <Link to="#" className="dropdown-item">Profile</Link>
                                    <hr className="dropdown-divider" />
                                    <Link to="#" className="dropdown-item">Logout</Link>
                                </div>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link"  onClick={()=>{setAdminComponent('homedata')}}>
                                        <i className="bi bi-house"></i> Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={()=>{setAdminComponent('Services')}}>
                                        <i className="bi bi-bar-chart"></i> Services
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={()=>{setAdminComponent('Customer')}}>
                                        <i className="bi bi-bar-chart"></i> Customer
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={()=>{setAdminComponent('Providers')}}>
                                        <i className="bi bi-chat"></i> Providers
                                        {/* <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span> */}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={()=>{setAdminComponent('Booking')}}>
                                        <i className="bi bi-bookmarks"></i> Booking
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={()=>{setAdminComponent('cancelBooking')}}>
                                        <i className="bi bi-people"></i> Cancel Booking
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={()=>{setAdminComponent('UserReview')}}>
                                        <i className="bi bi-people"></i> User Review
                                    </Link>
                                </li>
                            </ul>
                            <hr className="navbar-divider my-5 opacity-20" />
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">
                                        <i className="bi bi-person-square"></i> Account
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">
                                        <i className="bi bi-box-arrow-left"></i> Logout
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                    <header className="bg-surface-primary border-bottom pt-6">
                        <div className="container-fluid">
                            <div className="mb-npx">
                                <div className="row align-items-center">
                                    <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                                        <h1 className="h2 mb-0 ls-tight">Application</h1>
                                    </div>
                                    <div className="col-sm-6 col-12 text-sm-end">
                                        <div className="mx-n1">
                                           
                                            <Link to="#" className="btn d-inline-flex btn-sm mx-1 text-dark" style={{ background: '#FFB649' }}>
                                                <span className=" pe-2">
                                                    <i className="bi bi-plus"></i>
                                                </span>
                                                <span onClick={handleShow}>
                                                    Add Type Of Service
                                                </span>
                                            </Link>
                                        </div>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Service Type</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form method="post" onSubmit={addServiceType} className="w-100 mx-auto">
                                                    <input type="text" name="serviceType" placeholder="Enter Service Name" onChange={(e) => { handleInput(e) }} className="w-100 p-2 border-1 rounded-2" />
                                                    <div className="d-flex justify-content-center py-2">
                                                        <input type="submit" className="my-2 btn-block py-2 btn text-dark" style={{ background: '#FFB649' }} value='Add Service' />
                                                    </div>
                                                </form>
                                            </Modal.Body>

                                        </Modal>
                                    </div>
                                </div>
                                <ul className="nav nav-tabs mt-4 overflow-x border-0">
                                    <li className="nav-item ">
                                        <Link to="#" className="nav-link active">All files</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </header>
                    <main className="py-6 bg-surface-secondary">
                        <div className="container-fluid">
                            <div className="row g-6 mb-6">
                                <div className="col-xl-3 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Budget</span>
                                                    <span className="h3 font-bold mb-0">$750.90</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                        <i className="bi bi-credit-card"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                                    <i className="bi bi-arrow-up me-1"></i>13%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">New projects</span>
                                                    <span className="h3 font-bold mb-0">215</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                        <i className="bi bi-people"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                                    <i className="bi bi-arrow-up me-1"></i>30%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total hours</span>
                                                    <span className="h3 font-bold mb-0">1.400</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                                                        <i className="bi bi-clock-history"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-danger text-danger me-2">
                                                    <i className="bi bi-arrow-down me-1"></i>-5%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Work load</span>
                                                    <span className="h3 font-bold mb-0">95%</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                                                        <i className="bi bi-minecart-loaded"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                                    <i className="bi bi-arrow-up me-1"></i>10%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
            {
                (admincomponent==='homedata')?
                <AddServices/>
                :
                (admincomponent==='Services')?
                <Services/>
                :
                (admincomponent==='Customer')?
                <Customer />
                :
                (admincomponent==='UserReview')?
                <UserReview />
                :
                (admincomponent==='Booking')?
                <Booking />
                :
                (admincomponent==='Providers')?
                <ServiceProvider/>
                :
                (admincomponent==='cancelBooking')?
                <CancelOrder />
                :''
            }
        </>
    );
}

export default memo(AdminNav);