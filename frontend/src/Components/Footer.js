import React from "react";
import logo from "../images/OmniCareLogo.png";
import { Link } from "react-router-dom";
export default function footer() {
    return (
        <footer className="w-100" id="backfrounfImg">
          <div className="container">
            <div className="row m-0 py-2 px-2 justify-content-center">                
                        <div className="col-12 col-md-6 col-lg-3 d-fle justify-content-center" >
                            <div className="ms-4">
                                <img src={logo} width='200' />
                                <h6 className="text-light ps-4 pt-3 fs-6 fw-semibold">About Us</h6>
                                <p className="ps-4 pt-2 text-start text-light">At OmniCare, we take pride in being your one-stop solution for all your home service needs. With a commitment to excellence and a passion.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center" >
                            <div className="ms-4">
                                <h4 className="text-white pt-3 pb-2 fw-light" >Company</h4>
                                <h6 className="m-3" > <Link className=" text-white text-decoration-none fs-6 fw-semibold" >Home </Link></h6>
                                <h6 className="m-3" ><Link className=" text-white text-decoration-none fs-6 fw-semibold" >Contact Us</Link></h6>
                                <h6 className="m-3" ><Link className="  text-white text-decoration-none fs-6 fw-semibold" >Location </Link></h6>
                            </div>
                        </div>    
                        <div className="col-12 col-md-6 col-lg-3 d-flex align-items-center flex-column ">
                            <h4 className="text-white pt-3 pb-2 fw-light" >For cutomers</h4>                           
                            <h6 className="m-3" > <Link className=" text-white text-decoration-none fs-6 fw-semibold" >Services </Link></h6>
                            <h6 className="m-3" ><Link className=" text-white text-decoration-none fs-6 fw-semibold" >Blog</Link></h6>
                            <h6 className="m-3" ><Link className="  text-white text-decoration-none fs-6 fw-semibold" >Privacy Policy </Link></h6>                            
                        </div>
                        <div className="col-12 col-md-6 col-lg-3  d-flex align-items-center flex-column">                            
                            <h4 className="text-white pt-3 pb-2 fw-light" >Social Links</h4> 
                            <div className="d-flex">
                               <h6 className="mx-2 my-3" ><i className="fa fa-facebook-f text-light"></i></h6>
                               <h6 className="mx-2 my-3" ><i className="fa fa-instagram text-light"></i></h6>
                               <h6 className="mx-2 my-3" ><i className="fa fa-linkedin text-light"></i></h6>                            
                               <h6 className="mx-2 my-3" ><i className="fa fa-twitter text-light"></i></h6>                            
                            </div>                          
                        </div>                    
                 </div>
            </div> 
            <div className="w-100 px-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#191617' }} >
                <p className="text-center text-white mt-2">Copy Right &copy; Omnicare 2023</p>
                <p className="text-center text-white mx-3 mt-2">All Rights Reserved</p>
                <p className="text-center text-white mt-2">Designed By Logic Lites</p>
            </div>          
        </footer>
    );
}