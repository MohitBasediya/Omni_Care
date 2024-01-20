import logo1 from '../../images/logo1.png';
import logo2 from '../../images/logo2.webp';
import logo3 from '../../images/logo3.webp';
import logo4 from '../../images/logo4.svg';
import logo5 from '../../images/logo5.svg';
import shift from '../../images/shifting.jpg';
import cook from '../../images/cook1.jpg';
import { Link } from 'react-router-dom';
import './Home.css';
function Aboutus(){
    return(
         <>
         <section id="about" className='w-100'>
            <div className="container">
                <div className="row">
                  <div className="col-lg-5 py-3 ">
                     <h1 className="fw-bold pb-3 ">Why Choose Us ?</h1>
                     <p className="text-start" style={{color:'#292929'}}>At Omnicare, we take pride in being your one-stop solution for all your home service needs. With a commitment to excellence and a passion for enhancing your home experience, we have become a trusted name in the industry.</p>
                     <div className="container-fluid">   
                       <div className="row">
                        <div className="col-md-6 col-6 p-3">
                        <Link style={{textDecoration:'none'}}>
                          <div className="h-30 w-100 bg-yellow d-flex justify-content-around align-items-center">
                              <p className="text-light">Cleaner</p>
                              <img src={logo1} />
                          </div>
                        </Link>
                        </div>
                        <div className="col-md-6 col-6 p-3">
                         <Link style={{textDecoration:'none'}}>
                          <div className="h-30 w-100 bg-yellow d-flex justify-content-around align-items-center">
                              <p className="text-light ">Cleaner</p>
                              <img src={logo2} />
                          </div>
                          </Link>  
                        </div>
                       </div>
                       <div className='row pt-1'>
                          <div className='col-md-4 col-4 py-3 px-1'>
                           <Link style={{textDecoration:'none'}}>
                             <div className="h-30 w-100 bg-yellow d-flex justify-content-around align-items-center">
                                <p className="text-light">Cleaner</p>
                                <img src={logo3} />
                             </div>
                           </Link>
                          </div>
                          <div className='col-md-4 col-4 py-3 px-1'>
                            <Link style={{textDecoration:'none'}}>
                             <div className="h-30 w-100 bg-yellow d-flex justify-content-around align-items-center">
                                <p className="text-light">Cleaner</p>
                                <img src={logo4} />
                             </div>
                            </Link>
                          </div>
                          <div className='col-md-4 col-4 py-3 px-1'>
                            <Link style={{textDecoration:'none'}}>
                             <div className="h-30 w-100 bg-yellow d-flex justify-content-around align-items-center">
                                <p className="text-light">Cleaner</p>
                                <img src={logo5} />
                             </div>
                            </Link>
                          </div>
                       </div>
                     </div>
                  </div>
                  <div className="col-lg-7 p-2">
                     <div className='container'>
                        <div className='row'>
                           <div className='col-md-6 col-6 p-2 d-flex justify-content-center align-content-center'>
                                <img src={shift} className='img1'/>
                           </div>
                           <div className='col-md-6 col-6 p-2 d-flex justify-content-center align-content-center'>
                                <img src={cook} className='img2'/>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
         </section>
         </>
    );
}
export default Aboutus;