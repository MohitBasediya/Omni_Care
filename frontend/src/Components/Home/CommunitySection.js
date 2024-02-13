import React from 'react';
import HandFold from "../../images/HandFold.jpg"
import services1 from "../../images/services1.jpg";
import './Home.css';
export default function CommunitySection() {
    return (
        <section id='community'>
        <div className='container-fluid' style={{ backgroundColor: "black" }}>
            <div className='row text-light'>
                <div className='handclass col-lg-4 p-5 ms-2 flex-column position-relative'>
                    <div className='w-auto'>
                        <h2 className='waysH2 ms-4 text-light'>We <span className="highlight-text">BUILD</span><br /> Community<br /></h2>
                        <img src={HandFold} alt="" className="community-hands-image" />
                    </div>
                    <div className='mt-5' style={{paddingTop:'30px'}}>
                        <img style={{ width: "100%" }} src={services1} />
                    </div>
                </div>
                <div className='col-lg-7 col-md-12 communityBack ms-4'>
                    <h2 className='text-light'>Empowering Service Providers: Your Skills, Your Opportunities <big>-</big><br />All at Your Fingertips</h2>
                    <a href="/visit-vous" className="large-link w-inline-block py-2">
                        <div className="link-text-block">Unlock Opportunities</div>
                        <div className="link-arrow-wrapper" style={{ transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)", transformStyle: "preserve-3d" }}>
                            <div className='m-2 px-2'><i style={{ fontSize: "1.5rem" }} className="fa fa-arrow-right link-arrow"></i></div>
                        </div>
                    </a>
                    <p className="small-p col-7">Discover new horizons as a service provider - register with us today. Your skills deserve recognition on a platform that values your expertise. Join now and open doors to a world of opportunities<br /><br /></p>
                    <a href="/crews" className="large-link w-inline-block py-2">
                        <div className="link-text-block">Offered Services</div>
                        <div className="link-arrow-wrapper" style={{ transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)", transformStyle: "preserve-3d" }}>
                            <div className='m-2 px-2'><i style={{ fontSize: "1.5rem" }} className="fa fa-arrow-right link-arrow"></i></div>
                        </div>
                    </a>
                    <p className="small-p">You can access services such as electricians, cleaners, shifting, salon, and cooks.<br /><br /></p>
                    <a href="/growth-track" target="_blank" className="large-link w-inline-block py-2">
                        <div className="link-text-block">Profit Earnings</div>
                        <div className="link-arrow-wrapper" style={{ transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)", transformStyle: "preserve-3d" }}>
                            <div className='m-2 px-2'><i style={{ fontSize: "1.5rem" }} className="fa fa-arrow-right link-arrow"></i></div>
                        </div>
                    </a>
                    <p className="small-p">Earn with us: A great opportunity awaits on our platform<br /></p>
                </div>
            </div >
        </div >
        </section>
    );
}
