import React, { useEffect, useState } from 'react';
import { Carousel } from 'reactstrap';
import customerSectionImage from "../../images/customerSectionImage.jpg";
import './review.css';

export default function ReviewSection() {   
    useEffect(()=>{
            var multipleCardCarousel = document.querySelector("#carouselExampleControls");
            if (window.matchMedia("(min-width: 576px)").matches) {
            var carousel = new Carousel(multipleCardCarousel, {
                interval: false
            });
            var carouselInner = document.querySelector("#carouselExampleControls .carousel-inner1");
            var carouselWidth = carouselInner.scrollWidth;
            var cardWidth = document.querySelector("#carouselExampleControls .carousel-item1").offsetWidth;
            var scrollPosition = 0;
            console.log('carouselWidth : ',carouselWidth);
            console.log('cardWidth : ',cardWidth);
            document.querySelector("#carouselExampleControls .next-btn").addEventListener("click", function () {
                if (scrollPosition < carouselWidth - cardWidth * 3) {
                scrollPosition += cardWidth;
                carouselInner.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
                }
            });
            document.querySelector("#carouselExampleControls .prev-btn").addEventListener("click", function () {
                if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                carouselInner.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
                }
            });
            } else {
               multipleCardCarousel.classList.add("slide");
            }
    })
    return (
    <section id="testimonial-slider" >
    <div id="carouselExampleControls" className="carousel carousel-dark">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-sm-12" >
            <div className="w-100" style={{background:'#F9F5F4'}}>
               <img src={customerSectionImage} style={{width: "100%",border:'none'}} />
            </div>
            <div className="w-100 " style={{background:'#F9F5F4'}}>
              <div className="w-50 py-2 bg-light d-flex justify-content-center align-items-center" >  
                <button className="prev-btn" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="" aria-hidden="true">
                      <i className="fa fa-arrow-left fs-3 text-dark"></i>
                    </span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="next-btn" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="" aria-hidden="true">
                      <i className="fa fa-arrow-right fs-3 text-dark"></i>
                    </span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>  
            </div>
          </div>

          <div className="col-md-7 col-sm-12 position-relative">
            <h2 className="px-5 fw-bold">What Our Customer Says</h2>
            <div className="carousel-inner1 rounded-2">
              <div className="carousel-item1 active">
                <div className="card">
                  <div className="card-body">
                      <p className="card-text">Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!</p>
                      <div className="w-100 d-flex">
                        <img src="https://codingyaar.com/wp-content/uploads/headshot-1-scaled.jpg" style={{borderRadius: "50%",width: "50px",height: "50px"}} alt="..." />
                        <h5 className="card-title mx-3 mt-3">Sophie Divine</h5>                    
                      </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item1">
                <div className="card">                  
                  <div className="card-body">                    
                    <p className="card-text">Exceptional service! From the initial consultation to the final reveal, your team demonstrated professionalism and a keen eye for design. Highly recommend!</p>
                      <div className="w-100 d-flex">
                        <img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" style={{borderRadius: "50%",width: "50px",height: "50px"}} alt="..." />
                        <h5 className="card-title mx-3 mt-3">Sophie Carter</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item1">
                <div className="card">                 
                  <div className="card-body">
                    <p className="card-text">Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!</p>
                      <div className="w-100 d-flex">
                        <img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" style={{borderRadius: "50%",width: "50px",height: "50px"}} alt="..." />
                        <h5 className="card-title mx-3 mt-3">James Bennett</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item1">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">Exceptional service! From the initial consultation to the final reveal, your team demonstrated professionalism and a keen eye for design. Highly recommend!</p>
                      <div className="w-100 d-flex">
                        <img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" style={{borderRadius: "50%",width: "50px",height: "50px"}} alt="..." />
                        <h5 className="card-title mx-3 mt-3">James Bennett</h5>
                     </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item1">
                <div className="card">
                  <div className="card-body">
                      <p className="card-text">Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!</p>
                      <div className="w-100 d-flex">
                          <img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" style={{borderRadius: "50%",width: "50px",height: "50px"}} alt="..." />
                          <h5 className="card-title mx-3 mt-3">Sophie Carter</h5>
                      </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item1">
                <div className="card">
                  <div className="card-body">
                      <p className="card-text">Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!</p>
                      <div className="w-100 d-flex">
                          <img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" style={{borderRadius: "50%",width: "50px",height: "50px"}} alt="..." /> 
                          <h5 className="card-title mx-3 mt-3">Mitchel Starc</h5>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    );
}


