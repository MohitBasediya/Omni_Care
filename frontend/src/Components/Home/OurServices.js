import $ from 'jquery';
import { useEffect } from 'react';
import cleaner from '../../images/cleaner.jpg';
import electrician from '../../images/slide1.jpg';
import salon from '../../images/salon.jpg';
import packers from '../../images/packers1.jpg';
import cook from '../../images/cook2.jpg';
import { useNavigate } from 'react-router-dom';
import './Home.css';
function OurServices() {
    const navigate=useNavigate();
    useEffect(() => {
        $('.carousel .carousel-item').each(function () {
            var minPerSlide = 4;
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            for (var i = 0; i < minPerSlide; i++) { next = next.next(); if (!next.length) { next = $(this).siblings(':first'); } next.children(':first-child').clone().appendTo($(this)); }
        });
    });
    const handleButton1 = (category) => {
        console.log('Button clicked!');
        navigate('/Customer_services',{
            state:{
                Category:category
            }
        });
    };
    return (
        <>
            <section id='services' className='w-100'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 p-2'>
                            <h1 className='fw-bold'>Our Services</h1>
                            <p className='ps-1' style={{ color: '#292929', fontSize: '17px' }}>Discover an array of services meticulously crafted and personalized just for you</p>
                        </div>
                    </div>
                </div>
                <div id="myCarousel" className="container-fluid carousel slide container" data-bs-ride="carousel">
                    <div className="carousel-inner w-100">
                        <div className="carousel-item active">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={cleaner} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Cleaner</h3>
                                                <p className='text-light text-center pb-2'>Bathroom Kitchen Cleaning Sofa Cleaning Window Cleaning Dusting & Polishing </p>
                                                <button className='btn bg-yellow text-light' onClick={()=>{handleButton1('Cleaner')}}>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={salon} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Salon</h3>
                                                <p className='text-light text-center pb-2'>Hair cutting & Shaving for Men’s Facial & Waxing for Women’s Other services</p>
                                                <button className='btn bg-yellow text-light' onClick={()=>{handleButton1('Salon')}}>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={electrician} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Electrician</h3>
                                                <p className='text-light text-center pb-2'>Wires & Cables Repair Appliances Repair Electrical Installations Panel Upgrades</p>
                                                <button className='btn bg-yellow text-light' onClick={()=>{handleButton1('Electrician')}}>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={packers} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Shifting Agency</h3>
                                                <p className='text-light text-center pb-2'>Shift your luggage into the city outside the city and also outside the state</p>
                                                <button className='btn bg-yellow text-light' onClick={()=>{handleButton1('Shifting Agency')}}>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={cook} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Cook</h3>
                                                <p className='text-light text-center pb-2'>Make your own Thali select different region food item like south indian,chinese,gujarati.</p>
                                                <button className='btn bg-yellow text-light' onClick={()=>{handleButton1('Cook')}}>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='controls'>
                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon text-dark" aria-hidden="true">
                            <i className='fa fa-arrow-left'></i>
                        </span>
                    
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon text-dark" aria-hidden="true">
                            <i className='fa fa-arrow-right '></i>
                        </span>
                       
                    </button>
                </div>
            </section>
        </>
    );
}
export default OurServices;