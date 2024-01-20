// import '@fortawesome/fontawesome-free/css/all.css';
import cardimg1 from '../../images/salon1.jpg'
import './BookingPage.css';
function BookingPage(){
    return(<>
    <div className="container-fluid" style={{ background: '#F9F5F4' }}>        
         <div className="container" style={{ background: '#F9F5F4' }}>
            <div className="row mt-5">
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex p-3'>
                    <div className="naviconediv d-flex align-items-center justify-content-center rounded-circle h-50 p-3 mt-3 bg-dark">
                        <i className="fas fa-calendar-days text-white"  ></i>
                    </div>
                    <div className="ms-3  d-flex justify-content-center align-item-center">
                        <div>
                            <h4>Appointment</h4>
                            <p>Choose time &amp; date for<br/>the service</p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex p-3'>
                    <div className="naviconediv d-flex align-items-center justify-content-center rounded-circle h-50 p-3 mt-3 bg-dark">
                        <i className="fas fa-credit-card text-white"></i>
                    </div>
                    <div className="ms-3  d-flex justify-content-center align-item-center">
                        <div>
                          <h4>Appointment</h4>
                          <p>Choose time &amp; date for<br/>the service</p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex p-3'>
                    <div className="naviconediv d-flex align-items-center justify-content-center rounded-circle h-50 p-3 mt-3 bg-dark">
                        <i className="fa-solid fa-check text-white"></i>
                    </div>
                    <div className="ms-3  d-flex justify-content-center align-item-center">
                        <div>
                          <h4>Appointment</h4>
                          <p>Choose time &amp; date for<br/>the service</p>
                        </div>
                    </div>
                </div>
            </div>        
        </div>      
        <div className="row m-3">
            <div className="col-md-4 col-sm-4">
                <div className="p-3" style={{ background: '#FFB649', height: '100%' }}>                    
                    <div className='container'>
                        <div className='row'>
                            <div className='cardDiv mb-2' style={{background : 'white'}}>
                                <div className='card col-md-6 col-md-12'>
                                    <img src={cardimg1} alt="..."/>
                                </div>
                                <div className='card-body col-md-6 col-md-12'>
                                      <h5 className="card-title">Salon Service</h5>
                                      <p className="card-text">This is a wider card with supporting text below as a natural lead.</p>
                                    
                                    <div className="d-flex align-items-center">
                                      <button className="btn btn-outline-secondary">-</button>
                                      <span className="mx-1">1</span>
                                      <button className="btn btn-outline-secondary">+</button>
                                      <p id='price' className='m-1'>&#8377;100.00</p>
                                    </div>
                                </div>
                            </div>

                            <div className='cardDiv mb-2' style={{background : 'white'}}>
                                <div className='card col-md-6 col-md-12'>
                                    <img src={cardimg1} alt="..."/>
                                </div>
                                <div className='card-body col-md-6 col-md-12'>
                                        <h5 className="card-title">Salon Service</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead.</p>

                                    <div class="d-flex align-items-center">
                                        <button className="btn btn-outline-secondary">-</button>
                                        <span className="mx-1">1</span>
                                        <button className="btn btn-outline-secondary">+</button>
                                        <p id='price' className='m-1'>&#8377;100.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded rounded-5 p-1" style={{background : 'white'}}>
                        <h5>Payment Summary</h5>
                        <div className="d-flex justify-content-center align-items-center">
                        <table>
                         <thead>
                            <tr>
                              <th className='p-2 m-2'>Item Name</th>
                              <th className='p-2 m-2'>No of Item</th>
                              <th className='p-2 m-2'>Price</th>
                            </tr>
                         </thead>
                         <tbody>
                            <tr>
                              <td className='p-1 m-2'>Data 1</td>
                              <td className='p-1 m-2'>Data 2</td>
                              <td className='p-1 m-2'>Data 3</td>
                            </tr>
                            <tr>
                              <td className='p-1 m-2'>Data 4</td>
                              <td className='p-1 m-2'>Data 5</td>
                              <td className='p-1 m-2'>Data 6</td>
                            </tr>
                         </tbody>
                        </table>
                        </div>
                           <p className="d-flex justify-content-center align-items-center mt-2">Total Amount: $120.00</p>
                    </div>
                    {/* Payment Summary Div End */}

                    <div className="text-center mt-3">
                        <button type="button" class="btn btn-primary border-0" style={{background : 'black'}}>Request for Booking</button>
                    </div>
                </div>
            </div>
           
            <div className="col-md-8 col-sm-8">
            <div className="p-3" style={{ background: '#F9F5F4', height: '100%' }}>
                {/* Profile info div start */}
                <div className="rounded shadow  w-100  p-2" style={{ background: 'white' }}>
                    
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='row'>
                                  <div className='col-lg-4'>
                                    <div className="iconediv rounded-circle p-3 mt-2" style={{ background: '#D9D9D9' }}>
                                     <i className="fa-solid fa-user text-black ml-1 "></i>
                                    </div>
                                  </div>
                                  <div className='col-lg-8'>
                                  <div className="py-2">
                                        <h5>User Name</h5>
                                        <span>Andrew Anderson</span>
                                  </div>
                                  </div>
                                </div>
                            </div>  
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <div className="iconediv rounded-circle p-3 mt-2" style={{ background: '#D9D9D9' }}>
                                        <i className="fa-solid fa-envelope text-black ml-1 "></i>
                                        </div>
                                    </div>
                                    <div className='col-lg-8'>
                                        <div className="py-2">
                                            <h5>Email</h5>
                                            <span>andrew@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <div className="iconediv rounded-circle p-3 mt-2" style={{ background: '#D9D9D9' }}>
                                        <i className="fa-solid fa-phone text-black ml-1 "></i>
                                        </div>
                                    </div>
                                    <div className='col-lg-8'>
                                        <div className="py-2">
                                            <h5>Contact</h5>
                                            <span>+91 888-888-8888</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <div className="iconediv rounded-circle p-3 mt-2" style={{ background: '#D9D9D9' }}>
                                        <i className="fa-solid fa-calendar-days text-black ml-1 "></i>
                                        </div>
                                    </div>
                                    <div className='col-lg-8'>
                                        <div className="py-2">
                                            <h5>Date</h5>
                                            <span>12-12-2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Container end */}
                </div>
                {/* Profile info div end */}

                <div class="rounded shadow p-4 mt-4" style={{background : 'white'}}>
                <h2>Appointment Form</h2>
                    <div class="form-row align-items-center mb-3 p-2">
                    <div class="col-auto">
                        <label for="dateInput" class="mb-0">Date</label>
                    </div>
                    <div class="col d-flex justify-content-end align-items-end">
                        <input type="date" class="form-control rounded-1" id="dateInput"/>
                    </div>
                    </div>

                    <div class="form-row align-items-center mb-3 p-2">
                    <div class="col-auto">
                        <label for="dateInput" class="mb-0">State</label>
                    </div>
                    <div class="col d-flex justify-content-end align-items-end">
                        <select class="form-control rounded-1" id="stateInput">
                            <option value="">Select State</option>
                            <option value="state1">State 1</option>
                            <option value="state2">State 2</option>
                        </select>
                    </div>
                    </div>

                    <div class="form-row align-items-center mb-3 p-2">
                    <div class="col-auto">
                        <label for="cityInput" class="mb-0">City</label>
                    </div>
                    <div class="col d-flex justify-content-end align-items-end">
                        <select class="form-control rounded-1" id="cityInput">
                            <option value="">Select City</option>
                            <option value="state1">City 1</option>
                            <option value="state2">City 2</option>
                        </select>
                    </div>
                    </div>

                    <div class="form-row align-items-center mb-3 p-2">
                    <div class="col-auto">
                        <label for="dateInput" class="mb-0">Address</label>
                    </div>
                    <div class="col d-flex justify-content-end align-items-end">
                        <input type="text" class="form-control rounded-1" id="addressInput" placeholder="Enter Address"/>
                    </div>
                    </div>

                    <div class="form-row align-items-center mb-3 p-2">
                    <div class="col-auto">
                        <label for="dateInput" class="mb-0">Appointment Time</label>
                    </div>
                    <div class="col d-flex justify-content-end align-items-end">
                        <input type="time" class="form-control rounded-1" id="timeInput" placeholder="Select Time"/>
                    </div>
                    </div>
                </div>
                {/* Div for Booking Details end*/}

                {/* Div for Booking Conformation Msg start */}
                <div className="rounded shadow p-5 mt-4" style={{background : 'white'}}>
                    <p>"Please Wait For While...<br/>Until Your Request Is Accepted By Service Provider"</p>
                </div>
                </div>
            </div>{/* Second column end */}
            </div>{/* Second Main Div End */}
        </div>{/* Main Div Container End */}
    </>);
}
export default BookingPage;