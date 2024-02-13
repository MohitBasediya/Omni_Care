import React, { useEffect, useState, useRef } from 'react';
import customerSectionImage from "../../images/customerSectionImage.jpg";
import './review.css';
import axios from 'axios';

export default function ReviewSection() {
  const [customerdata, setdata] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/admin/UserReview');
        console.log("In The UserReview ");
        console.log(response);
        setdata(response.data.result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const review = () => {
      const multipleCardCarousel = carouselRef.current;

      if (multipleCardCarousel && window.matchMedia("(min-width: 576px)").matches) {
        const carouselInner = document.querySelector("#carouselExampleControls .carousel-inner1");

        if (carouselInner) {
          const cardWidth = carouselInner.firstElementChild?.offsetWidth;
          const carouselWidth = carouselInner?.scrollWidth;

          console.log('cardWidth : ', cardWidth);
          console.log('carouselWidth : ', carouselWidth);

          let scrollPosition = 0;

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
        }
      } else if (multipleCardCarousel) {
        multipleCardCarousel.classList.add("slide");
      }
    };

    // Call review function after a delay to ensure the DOM is ready
    setTimeout(review, 1000);
  }, []);

  return (
    <section id="testimonial-slider">
      <div id="carouselExampleControls" className="carousel carousel-dark" ref={carouselRef}>
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-12" >
              <div className="w-100" >
                <img src={customerSectionImage} style={{ width: "100%", border: 'none' }} />
              </div>
              <div className="w-100 " >
                <div className="w-50 py-2  d-flex justify-content-center align-items-center" >
                  <button className="prev-btn mx-5 shadow-lg" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="" aria-hidden="true">
                      <i className="fa fa-arrow-left fs-3 text-dark"></i>
                    </span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="next-btn mx-5 shadow-lg" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="" aria-hidden="true">
                      <i className="fa fa-arrow-right fs-3 text-dark"></i>
                    </span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12 position-relative ">
              <h1 className="px-5 fw-bold">What Our Customer Says</h1>
              <div className="carousel-inner1 rounded-2">
                {
                  customerdata.map((data) => {
                    if (data.Status === 'Accept') {
                      return (
                        <div className="carousel-item1 active">
                          <div className="card">
                            <div className="card-body">
                              <p className="card-text text-white my-3">{data.Text_Review}</p>
                              <div className="w-100 d-flex">
                                <h5 className="card-title text-white mx-3 mt-3">{data.user[0].Name}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                }                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}