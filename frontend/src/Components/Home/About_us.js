import React, { useEffect } from 'react';
import Aboutus from'../../images/shifting.jpg';
import service from '../../images/services/service1.webp';
import icon1 from '../../images/services/service-icon1.webp';
import icon2 from '../../images/services/service-icon2.webp';
import icon3 from '../../images/services/service-icon3.webp';
import icon4 from '../../images/services/service-icon4.webp';
import team1 from'../../images/team/team1.webp';
import team2 from'../../images/team/team2.webp';
import team3 from'../../images/team/team3.webp';
import team4 from'../../images/team/team4.webp';
import {Link} from 'react-router-dom';
import slide1 from '../../images/slider/slider1.webp';
import slide2 from '../../images/slider/slider2.webp';
import slide3 from '../../images/customerSectionImage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typed from 'typed.js';
import './About.css';

export default function About_us() {
    useEffect(() => {
        // Create a new instance of Typed.js inside the useEffect hook
        const options = {
          strings: ['Diverse Services ,One Platform'],
          typeSpeed: 70, // typing speed in milliseconds
          backSpeed: 50, // backspacing speed in milliseconds
          loop: true, // loop the animation
        };
    
        const typed = new Typed('.element', options);
        const typed1 = new Typed('.element1', options);
        const typed2 = new Typed('.element2', options);
    
        // Clean up the Typed instance on component unmount
        return () => {
          typed.destroy();
          typed1.destroy();
          typed2.destroy();
        };
      }, []);


    return (
        <>  
        <section id='about_us_slide'>
        <div data-bs-spy="scroll" data-bs-target=".navbar" data-bs-offset="100">

        <div className="carousel slide" data-bs-ride="carousel" id="carouselExampleCaptions">
		    <div className="carousel-inner">
			  <div className="carousel-item active bg-1">
				  <div className="carousel-caption">
					  <h5>Omnicare <span className="text-warning element"></span></h5>
					  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, culpa.</p>
					  <a className="bg-warning text-white" href="#">Learn More</a>
				  </div>
			  </div>
			  <div className="carousel-item bg-2">
				  <div className="carousel-caption">
					  <h5>Omnicare <span className="text-warning element1"></span></h5>
					  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, culpa.</p><a className="bg-warning text-white" href="#">Learn More</a>
				  </div>
			  </div>
			  <div className="carousel-item bg-3">
				  <div className="carousel-caption">
					  <h5>Omnicare <span className="text-warning element2"></span></h5>
					  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, culpa.</p><a className="bg-warning text-white" href="#">Learn More</a>
				  </div>
			  </div>
		    </div>
            <button className="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleCaptions" type="button">
			  <span aria-hidden="true" className="carousel-control-prev-icon"> </span> 
              <span className="visually-hidden">Previous</span>
            </button>
		    <button className="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleCaptions" type="button">
			  <span aria-hidden="true" className="carousel-control-next-icon"></span>
			  <span className="visually-hidden">Next</span>
            </button>
		    <div className="carousel-indicators">
			   <button aria-label="Slide 1" className="active" data-bs-slide-to="0" data-bs-target="#carouselExampleCaptions" type="button"><img className="img-fluid" src={slide1} /></button> <button aria-label="Slide 2" data-bs-slide-to="1" data-bs-target="#carouselExampleCaptions" type="button"><img className="img-fluid" src={slide2} /></button> <button aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#carouselExampleCaptions" type="button"><img className="img-fluid" src={slide3} /></button>
		    </div>
	  </div>
        

    <section id="about" className="about_wrapper about_us">
        <div className="container">
            <div className="row flex-lg-row flex-column-reverse">
                <div className="col-lg-6 text-center text-md-start">
                    <h3>Welcome to <span className="span">Omnicare <br className="d-none d-lg-block"/>
                        Diverse Services </span> One Platform</h3>
                    <p>lorum luptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                        dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                    <p>lorum luptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                        dolores eos qui ratione voluptatem</p>
                    <Link to="#" className="main-btn mt-4">Explore</Link>
                </div>
                <div className="col-lg-6 mb-4 mb-lg-0 ps-lg-4 text-center">
                    <img decoding="async" src={Aboutus} className="img-fluid w-100 over " alt="About Us"/>
                </div>

            </div>
        </div>
    </section>

    <section id="services" className="services_wrapper about_us h-auto">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 section-title text-center mb-5">
                    <h6>We Are Here For You</h6>
                    <h3>Our Awesome Services</h3>
                </div>
            </div>
            <div className="row align-items-center service-item-wrap">
                <div className="col-lg-7 p-lg-0">
                    {/* <!--Service Area Start--> */}
                    <div className="tab-content" id="myTabContent">                      
                        
                        <div className="tab-pane fade active show" id="spa" role="tabpanel">
                            <img decoding="async" src={service} alt=""/>
                        </div>
                    </div>
                    {/* <!--Service Area End--> */}
                </div>
            
                <div className="col-lg-5 position-relative">
                    {/* <!--Service Tab Menu Area Start--> */}
                    <div className="service-menu-area">
                        <ul className="nav">
                            <li>
                                <a data-bs-toggle="tab" href="#spa" >
                                    <span className="service-icon">
                                        <img decoding="async" src={icon1} alt=""/>
                                    </span>
                                    <h5>Saloon</h5>
                                    <p><span>Spa and beauty </span>luptatem quia voluptas sit aspernatur aut odit aut
                                        fugit, sed quia </p>
                                </a>
                            </li>
                            <li>
                                <a data-bs-toggle="tab" href="#restaurent">
                                    <span className="service-icon">
                                        <img decoding="async" src={icon2} alt=""/>
                                    </span>
                                    <h5>Cook</h5>
                                    <p><span>Cook</span> lup provide grro tatem quia voluptas sit aspernatur aut
                                        odit aut fugit, </p>
                                </a>
                            </li>
                            <li>
                                <a data-bs-toggle="tab" href="#swimming">
                                    <span className="service-icon">
                                        <img decoding="async" src={icon3} alt=""/>
                                    </span>
                                    <h5>Electrician</h5>
                                    <p><span>Electrician</span> pool luptatem quia voluptas sit aspernatur aut odit aut
                                        fugit, sed quia </p>
                                </a>
                            </li>
                            <li>
                                <a data-bs-toggle="tab" href="#conference">
                                    <span className="service-icon">
                                        <img decoding="async" src={icon4} alt=""/>
                                    </span>
                                    <h5>Cleaner</h5>
                                    <p><span>Cleaner</span> luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        sed quia </p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <!--Service Tab Menu Area End--> */}
                </div>
            </div>
        </div>      
    </section>

    <section id="team" className="team_wrapper about_us">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 section-title text-center mb-5">
                    <h6>What I can do for you</h6>
                    <h3>Our Special Team</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card p-0 rounded-3">
                        <img decoding="async" src={team1} className="img-fluid rounded-5" />
                        <div className="team-info">
                            <h5>Shirley Gibson</h5>
                            <p>Designer & Developer</p>
                            <ul className="social-network">
                                <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-vimeo-v"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card p-0 rounded-3">
                        <img decoding="async" src={team2} className="img-fluid rounded-3" />
                        <div className="team-info">
                            <h5>Ronald Long</h5>
                            <p>Designer</p>
                            <ul className="social-network">
                                <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-vimeo-v"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card p-0 rounded-3">
                        <img decoding="async" src={team3} className="img-fluid rounded-3" />
                        <div className="team-info">
                            <h5>Ashley Sanchez</h5>
                            <p>Tester</p>
                            <ul className="social-network">
                                <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-vimeo-v"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card p-0 rounded-3">
                        <img decoding="async" src={team4} className="img-fluid rounded-3" />
                        <div className="team-info">
                            <h5>Jessica Watson</h5>
                            <p>Developer</p>
                            <ul className="social-network">
                                <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-google-plus-g"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-vimeo-v"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>
    </div>
    </section>     
        </>

    );
    
    }