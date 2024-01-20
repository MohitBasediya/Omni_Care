import React, { useState } from 'react';
import profile from "../../images/Userprofile.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css';
import CustomerBooking from './CustomerBooking.js';
import { useSelector,useDispatch } from 'react-redux';
import { Modal, ModalHeader } from 'reactstrap';
import { requestedURL } from '../../urls.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CustomerProfile = () => {
  const [isupdatemodel,setIsUpdateModel]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.userSlice.user_Data);
  const [updatedUserData,setUpdatedUserData] = useState(userData);
  console.log("Customer Profile =>",updatedUserData);
  const [customercomponent,setCustomerComponent]=useState('Booking');

  const handleInput = (event)=>{
    const {name,value} = event.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]:value
    });
  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try{
      console.log("updatedUserData=>",updatedUserData);
      var result = await axios.post(requestedURL + "/updateuser",{updatedData : updatedUserData});
      console.log("Result Updated Data=>",result);

      if(result.status==201){
        setUpdatedUserData(updatedUserData);
        setIsUpdateModel(false);
        navigate('/customer_profile');
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className='w-100 p-2' style={{background:'#FFB649'}}>
          <section className="userProfile card mx-auto">
              <div className="profile  mx-auto">
                <figure>
                  <img src={profile} alt="profile" />
                </figure>
              </div>
            </section>
            <h3 className='text-dark text-center' style={{ paddingLeft: "1rem" }}>Andrew Anderson</h3>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-2 p-4">
            <div className="work_skills ">
              <div className="profile-tab-nav ">
                <ul className="nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" >
                  <li>
                  <a className="nav-link active" id="profile-tab" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{marginTop:"0.5rem"}}>
                    Profile
                  </a>
                  </li>
                  <li>
                  <a className="nav-link" id="editprofile-tab" onClick={()=>{setCustomerComponent('Booking')}} data-bs-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                    Booking History
                  </a>
                  </li>
                  <li>
                  <a className="nav-link" id="password-tab" onClick={()=>{setIsUpdateModel(true)}} data-bs-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">
                    Update Profile
                  </a>
                  </li>
                  <li>
                  <a className="nav-link " id="overview-tab" onClick={()=>{setCustomerComponent('Transaction')}} data-bs-toggle="pill" href="#application" role="tab"  aria-controls="application" aria-selected="false">
                    Transaction Details
                  </a>
                  </li>
                  <li>
                  <a className="nav-link " id="overview-tab" data-bs-toggle="pill" href="#application" role="tab"  aria-controls="application" aria-selected="false">
                    Review Us
                  </a>
                  </li>
                  <li>
                  <a className="nav-link " id="overview-tab" data-bs-toggle="pill" href="#application" role="tab"  aria-controls="application" aria-selected="false">
                    Refer a Freind
                  </a>
                  </li>
                </ul>
                <button id="nav-btn" className=' mx-auto'>Service</button>                
              </div>
            </div>
          </div>
          <div className="offcanvas offcanvas-start" style={{background:'#FFB649'}} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="container-fluid">
              <div className='d-flex justify-content-between align-content-center p-2'>
                <div className='w-100 p-2'>
                  <section className="userProfile card">
                    <div className="profile">
                      <figure>
                        <img src={profile} alt="profile" />
                      </figure>
                    </div>
                  </section>
                  <h4 className='text-light' style={{ paddingLeft: "1rem" }}>Andrew Anderson</h4>
                </div>
                <div className='p-1'>
                <button type="button" className="btn text-reset bg-light" data-bs-dismiss="offcanvas" aria-label="Close">
                  <i className='fa fa-close text-dark fs-5'></i>
                </button>
                </div>
              </div>         
             </div>
            <div className="offcanvas-body text-light">
              <div className='container-fluid'>
                 <p className='fs-3 fw-lighter' style={{marginLeft:'-20px',color:'black'}}>Account Detail</p>
                 <div className='acc-detail text-light'>
                   <h5 className='py-2'>andrewanderson@gmail.com</h5>
                   <h5 className='pb-2'>Male</h5>
                   <h5 className='pb-2'>7898061522</h5>    
                   <h5 className='pb-2'>No of Bookings :- 10</h5>    
                   <h5>No of Transactions :- 10</h5>    
                 </div>
              </div>              
            </div>
          </div>

          {
             (customercomponent==='Booking')
             ?
             <CustomerBooking/>
             :
             (customercomponent==='Transaction')
             ?
             ''
             :
             ''
        }
          
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div id="currentservices">
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <h4 className='py-2 fw-bold px-3'>Current Services </h4>
                  </div>
                  <div className="col-3">
                    <img src={profile} id="serviceimg" alt="" />
                  </div>
                  <div className="col-6">
                    <p id="servicename">Hair cut & shining</p>
                    <p id="servicename1">it's amazing</p>
                  </div>
                  <div className="col-3">
                    <p>
                      150 &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>
                    </p>
                  </div>
                  <div className="col-3">
                    <img src={profile} id="serviceimg" alt="" />
                  </div>
                  <div className="col-6">
                    <p id="servicename">Hair cut & shining</p>
                    <p id="servicename1">it's amazing</p>
                  </div>
                  <div className="col-3">
                    <p>
                      150 &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>
                    </p>
                  </div>
                  <div className="col-3">
                    <img src={profile} id="serviceimg" alt="" />
                  </div>
                  <div className="col-6">
                    <p id="servicename">Hair cut & shining</p>
                    <p id="servicename1">it's amazing</p>
                  </div>
                  <div className="col-3">
                    <p>
                      150 &nbsp;<i className="fa-solid fa-indian-rupee-sign"></i>
                    </p>
                  </div>
                  <div className='col-12 p-3'>
                    <button className='btn d-block w-100 mx-auto btn-dark text-light'>See All</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
        </div>        

        <Modal isOpen={isupdatemodel} id='updatemodel'>
            <ModalHeader toggle={()=>{setIsUpdateModel(false)}}>Update Detail</ModalHeader>
            <div className='container p-2'>
               <div className='row'>
                  <form method='post' onSubmit={handleSubmit}>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Enter Name</label>
                         <input className='form-control' type='text' placeholder='Enter Name' name="Name" defaultValue={updatedUserData.Name} onChange={handleInput}/>
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Contact Number</label>
                         <input className='form-control' type='text' placeholder='Enter Number' name='Contact_No' defaultValue={updatedUserData.Contact_No} onChange={handleInput}/>
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Gender</label><br />
                         <input type="radio" name="Gender" value="Male" checked={updatedUserData.Gender === 'Male'} onChange={handleInput}/><label className='px-2'>Male</label>
                         <input type="radio" name="Gender" value="Female" checked={updatedUserData.Gender === 'Female'} onChange={handleInput}/><label className='px-2'>Female</label>                         
                      </div>
                      <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                         <button type='submit' className='btn btn-dark text-light mx-2'>Update</button>
                         <input type='reset' className='btn btn-danger text-light mx-2' onClick={()=>{setIsUpdateModel(false)}} value='Close'/>
                      </div>
                  </form>
               </div>
            </div>
        </Modal>
    </>
  );
};

export default CustomerProfile;
