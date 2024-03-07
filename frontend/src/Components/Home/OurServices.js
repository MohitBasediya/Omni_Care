import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import cleaner from '../../images/cleaner.jpg';
import electrician from '../../images/slide1.jpg';
import salon from '../../images/salon.jpg';
import packers from '../../images/packers1.jpg';
import cook from '../../images/cook2.jpg';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

export default function OurServices() {
    var navigate = useNavigate();

    const handleButton1 = (category) => {
        console.log('helo ',category)
        if(category==='Shifting Agency'){
            navigate('/agency_list',{
                state: {
                    Category: category
                }
            });
        }else{
        navigate('/Customer_services',{
            state: {
                Category: category
            }
        });
      }
    };

    return (
        <section id='services' className='w-100 pt-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 p-2'>
                        <h1 className='fw-bold'>Our Services</h1>
                        <p className='ps-1' style={{ color: '#292929', fontSize: '17px' }}>Discover an array of services meticulously crafted and personalized just for you</p>
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    520: {
                        slidesPerView: 2
                    },
                    950: {
                        slidesPerView: 3
                    }
                }}
                modules={[ Navigation]}
                className="mySwiper mb-4 px-5"
            >
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
                    <div className='card border-0' style={{ background: '#F9F5F4' }}>
                        <div className='card-img-top p-4'>
                            <div className='content'>
                                <img className="" src={cook} />
                                <div className='content2'>
                                    <h3 className='text-light py-2'>Cook</h3>
                                    <p className='text-light text-center pb-2'>Make your own Thali select different region food item like south indian,chinese,gujarati.</p>
                                    <button className='btn bg-yellow text-light' onClick={()=>{handleButton1('Cooking')}}>View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper >
        </section>
    )
}