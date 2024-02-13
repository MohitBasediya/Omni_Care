import './BookingPage.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestedURL } from '../../urls';
import { userData } from '../../store/userSlice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s_a from '../Registration/City_State_Array.js';
import state_arr from '../Registration/City_State_Array.js';
function BookingPage(){
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const location = useLocation();
     const UserData=useSelector(state=>state.userSlice.user_Data);
     const [serviceData,setServicesData]=useState([]);
     const [customerData,setCustomerData]=useState({
        Date: '',
        State: '',
        City: '',
        Address: '',
        Time: '',
        Customer_id: '',
        ServiceType:'',
        TotalPrice:0,
        ServiceName:'',
        ServiceCategory:''
     });
     const print_state = () => {
        var option_str = document.getElementById("state");
        option_str.length = 0;
        option_str.options[0] = new Option('Select State', '');
        option_str.selectedIndex = 0;
        for (var i = 0; i < state_arr.state_arr.length; i++) {
            option_str.options[option_str.length] = new Option(state_arr.state_arr[i], state_arr.state_arr[i]);
        }
    }
    const print_city = (e, city_id) => {
        var state_index = e.target.selectedIndex;
        var option_str = document.getElementById(city_id);
        option_str.length = 0;
        option_str.options[0] = new Option('Select City', '');
        option_str.selectedIndex = 0;
        var city_arr = s_a.s_a[state_index].split("|");
        for (var i = 0; i < city_arr.length; i++) {
            option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
        }
        handleInput(e);
    }
    const alterQuantity=(sign,index)=>{
        var servicedata=serviceData;
        if(sign==='-'){
            if(serviceData[index].Quantity>0){
            servicedata[index]={...servicedata[index],Quantity:servicedata[index].Quantity-1};
            setCustomerData({...customerData,TotalPrice:customerData.TotalPrice - servicedata[index].ServicePrice});
            }
            else{
                Swal.fire('Quantity is already zero');
            }
        }else{
            servicedata[index]={...servicedata[index],Quantity:servicedata[index].Quantity+1};
            setCustomerData({...customerData,TotalPrice:customerData.TotalPrice+servicedata[index].ServicePrice});
        }
        setServicesData([...servicedata]);
    }
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            print_state();
        }, 1000);
        return () => clearTimeout(timeoutId);
    },[]);
    useEffect(()=>{
        window.scrollTo(0,0);
        var price=0;
        var servicename='';
        setServicesData(location.state.serviceData);
        location.state.serviceData.map((service,index)=>{
            price+=service.ServicePrice;
            servicename+=`${index + 1}.${service.ServiceName} `;
        });
        console.log('category : ',location.state.serviceCategory);
        setCustomerData({...customerData,TotalPrice:price,ServiceName:servicename,Customer_id:UserData._id,ServiceType:location.state.serviceType,ServiceCategory:location.state.serviceCategory});
    },[]);

    const handleInput=(e)=>{
        const {name,value} = e.target;
        setCustomerData({...customerData,[name]:value});
    }

    const submitBooking=async(e)=>{
        e.preventDefault();
        try{
            console.log('Customer Data ',customerData);
            console.log('Service Data ',serviceData);
            var result = await axios.post(requestedURL+'/booking',customerData);
            if(result.status===201){
                Swal.fire("Booking Successful");
            }
        }catch(error){
            console.log('Error ',error);
        }
    }
    
    const backendBaseUrl = 'http://localhost:3001';
    return(<>
    <section id='booking'>
      <div className="container-fluid pt-5" style={{ background: '#F9F5F4' }}>        
         <div className="container" style={{ background: '#F9F5F4' }}>
            <div className="row pt-5">
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    <div className='d-flex px-3 py-2'>
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
                    <div className='w-100 bg-dark' style={{height:'2px'}}></div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    <div className='d-flex px-3 py-2'>
                        <div className="naviconediv d-flex align-items-center justify-content-center rounded-circle h-50 p-3 mt-3 bg-dark">
                            <i className="fas fa-credit-card text-white"></i>
                        </div>
                        <div className="ms-3  d-flex justify-content-center align-item-center">
                            <div>
                            <h4>Payment</h4>
                            <p>Choose time &amp; date for<br/>the service</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 bg-dark' style={{height:'2px'}}></div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    <div className='d-flex px-3 py-2'>
                        <div className="naviconediv d-flex align-items-center justify-content-center rounded-circle h-50 p-3 mt-3 bg-dark">
                            <i className="fa-solid fa-check text-white"></i>
                        </div>
                        <div className="ms-3 d-flex justify-content-center align-item-center">
                            <div>
                            <h4>Done</h4>
                            <p>Choose time &amp; date for<br/>the service</p>
                            </div>
                        </div>
                    </div> 
                    <div className='w-100 bg-dark' style={{height:'2px'}}></div>   
                </div>
            </div>        
        </div>      
        <div className="row p-4">
            <div className="col-md-3 col-sm-3">
                <div className="p-3" style={{ background: '#FFB649', height: '100%' }}>                    
                    <div className='container mb-2'>
                        <div className='row'>
                            {
                                serviceData.map((service,index)=>{
                                    return(
                                <div className='cardDiv my-2' key={index} style={{background : 'white'}}>
                                    <div className='col-md-6 py-2 col-md-12'>
                                        <img src={`${backendBaseUrl}/uploads/${service.ServiceImage}`} alt=""/>
                                    </div>
                                    <div className='card-body col-md-6 col-md-12'>
                                        <h4 className="py-2 text-center">{service.ServiceName}</h4>
                                        <p className="card-text text-center pb-1">{service.ServiceDesc}</p>                                        
                                        <div className="d-flex align-items-center pb-2">
                                         <button className="btn btn-outline-secondary" onClick={()=>{alterQuantity('-',index)}}>-</button>
                                           <span className="mx-2">
                                            {service.Quantity}
                                           </span>
                                         <button className="btn btn-outline-secondary" onClick={()=>{alterQuantity('+',index)}}>+</button>
                                        <p id='price' className='m-1'>&#8377;{service.ServicePrice * service.Quantity}</p>
                                        </div>
                                    </div>
                                </div>
                                );
                                })
                            }
                        </div>
                    </div>
                    
                    <div className="w-100 rounded-1 p-1" style={{background : 'white'}}>
                        <h4 style={{borderBottom:'1px solid black',padding:'5px',display:'inline'}}>Payment Summary</h4>
                        <div className='table-responsive'>
                            <table className='table' cellPadding={0} cellSpacing={0} style={{margin:'0'}}>
                            <thead>
                                <tr>
                                    <th scope='col'>Item Name</th>
                                    <th scope='col'>No of Item</th>
                                    <th scope='col'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                serviceData.map((service,index)=>{
                                    return(
                                    <tr>
                                        <td>{service.ServiceName}</td>
                                        <td>{service.Quantity}</td>
                                        <td>{service.ServicePrice * service.Quantity}</td>
                                    </tr>
                                    );
                                })
                                }
                            </tbody>
                            </table>                        
                        </div>
                           <p className="d-flex justify-content-center align-items-center mt-2">Total Amount: 
                           {
                             customerData.TotalPrice
                           }
                           </p>
                    </div>
{/* 
                    <div className="text-center mt-3">
                        <button type="button" class="btn btn-primary border-0" style={{background : 'black'}}>Request for Booking</button>
                    </div> */}
                </div>
            </div>
           
            <div className="col-md-9 col-sm-9">
            <div className="p-3" style={{ background: '#F9F5F4', height: '100%' }}>
                {/* Profile info div start */}
                <div className="rounded shadow  w-100  p-2" style={{ background: 'white' }}>                    
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='row'>
                                  <div className='col-lg-12 d-flex justify-content-start'>
                                    <div className="iconediv my-2" style={{ background: '#D9D9D9' }}>
                                     <i className="fa-solid fa-user fs-4 text-black ml-1 "></i>
                                    </div>
                                    <div className="my-2 px-3">
                                        <h5>User Name</h5>
                                        <span>{UserData.Name}</span>
                                    </div>
                                  </div>
                                </div>
                            </div>  
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex justify-content-start'>
                                        <div className="iconediv my-2" style={{ background: '#D9D9D9' }}>
                                        <i className="fa-solid fa-envelope fs-4 text-black ml-1 "></i>
                                        </div>
                                        <div className="my-2 px-3">
                                            <h5>Email</h5>
                                            <span>{UserData.Email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex justify-content-start'>
                                        <div className="iconediv my-2" style={{ background: '#D9D9D9' }}>
                                        <i className="fa-solid fa-phone fs-4 text-black ml-1 "></i>
                                        </div>                                    
                                        <div className="my-2 px-3">
                                            <h5>Contact</h5>
                                            <span>{UserData.Contact_No}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex justify-content-start'>
                                        <div className="iconediv my-2" style={{ background: '#D9D9D9' }}>
                                        <i className="fa-solid fa-calendar-days fs-4 text-black ml-1 "></i>
                                        </div>
                                        <div className="my-2 px-3">
                                            <h5>Date</h5>
                                            <span>{new Date().getDate()} - {new Date().getMonth()+1} - {new Date().getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Container end */}
                </div>
                {/* Profile info div end */}

            <div className="rounded shadow p-4 mt-4" style={{background : 'white'}}>
                   <h2>Appointment Form</h2>
                <form onSubmit={submitBooking} method='post'>
                    <div className="form-row align-items-center mb-3 p-2">
                        <div className="col-auto">
                            <label for="dateInput" className="mb-0">Date</label>
                        </div>
                        <div className="col d-flex justify-content-end align-items-end">
                            <input type="date" name='Date' className="form-control rounded-1" onChange={(e)=>{handleInput(e)}} id="dateInput"/>
                        </div>
                    </div>

                    <div className="form-row align-items-center mb-3 p-2">
                        <div className="col-auto">
                            <label for="dateInput" className="mb-0">State</label>
                        </div>
                        <div className="col d-flex justify-content-end align-items-end">
                            <select className="form-control rounded-1" onChange={(e)=>{print_city(e,'city')}} name='State' id="state">
                                
                            </select>
                        </div>
                    </div>

                    <div className="form-row align-items-center mb-3 p-2">
                        <div className="col-auto">
                            <label for="city" className="mb-0">City</label>
                        </div>
                        <div className="col d-flex justify-content-end align-items-end">
                            <select className="form-control rounded-1" name='City' id="city" onChange={(e)=>{handleInput(e)}}>
                            
                            </select>
                        </div>
                    </div>

                    <div className="form-row align-items-center mb-3 p-2">
                        <div className="col-auto">
                            <label for="dateInput" class="mb-0">Address</label>
                        </div>
                        <div className="col d-flex justify-content-end align-items-end">
                            <input type="text" className="form-control rounded-1" id="addressInput" name='Address' onChange={(e)=>{handleInput(e)}} placeholder="Enter Address"/>
                        </div>
                    </div>

                    <div className="form-row align-items-center mb-3 p-2">
                        <div className="col-auto">
                            <label for="dateInput" className="mb-0">Appointment Time</label>
                        </div>
                        <div className="col d-flex justify-content-end align-items-end">
                            <input type="time" className="form-control rounded-1" name='Time' onChange={(e)=>{handleInput(e)}} id="timeInput" placeholder="Select Time"/>
                        </div>
                    </div>
                    <div className="form-row align-items-center mb-3 p-2">
                        
                        <div className="col d-flex justify-content-center align-items-center">
                            <input type="submit" className="btn btn-dark text-light" value='Book Appointment'/>
                        </div>
                    </div>
                </form>
            </div>
                {/* Div for Booking Details end*/}

                {/* Div for Booking Conformation Msg start */}
                <div className="rounded shadow p-5 mt-4" style={{background : 'white'}}>
                    <p>"Please Wait For While...<br/>Until Your Request Is Accepted By Service Provider"</p>
                </div>
                </div>
            </div>{/* Second column end */}
            </div>
        </div>
    </section>
    </>);
}
export default BookingPage;