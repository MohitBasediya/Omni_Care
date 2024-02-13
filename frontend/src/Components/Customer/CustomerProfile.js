import React, { useState,useEffect } from 'react';
import profile from "../../images/Userprofile.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css';
import CustomerBooking from './CustomerBooking.js';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader } from 'reactstrap';
import { requestedURL } from '../../urls.js';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import CustomerCancelBooking from './CustomerCancelBooking.js';
import { userData } from '../../store/userSlice.js';
const CustomerProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();
  const [updatedUserData,setUpdatedUserData] = useState({});
  const [isupdatemodel,setIsUpdateModel]= useState(false);
  const [reviewmodel,setreviewModel]= useState(false);
  const [AddReview,setReviewData] = useState("");
  const [customercomponent,setCustomerComponent] = useState('');
  const [billmodel,setBillModel]= useState(false);
  const [billdata,setBillData] = useState({});
  const handleInput = (event)=>{
    const {name,value} = event.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]:value
    });
  }

  const handleInput1 = (event)=>{
    const {name,value} = event.target;
    setReviewData(value);
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
  const handleSubmit1 = async(event)=>{
    event.preventDefault();
    try{
      const data={
        review:AddReview,
        userId:updatedUserData._id
      }
      console.log("Add Review=>",AddReview);

      var result = await axios.post(requestedURL + "/AddReview",data);
      console.log("Result Updated Data=>",result);

      if(result.status==201){
        setReviewData(AddReview);
        setreviewModel(false);
        navigate('/customer_profile');
      }
    }catch(err){
      console.log(err);
    }
  }
    
  const submitBooking =async()=>{
    try{
      console.log("submit booking");
      var result = await axios.post(`${requestedURL}/confirmbooking`);
      if(result.status === 201){
        Swal.fire("Booking confirmed");
        setBillData(result.data.billdata);
        navigate('/customer_profile');
      }else if(result.status ===203){
        Swal.fire("Error when confirm booking");
      }else if(result.status ===500 ){
        Swal.fire("Error while confirm booking");
      }
    }catch(error){
      console.log("error ",error);
      Swal.fire("Error while request sent to backend")
    }
  }
    useEffect(()=>{
      var data=async()=>{
            var cookie_token= Cookies.get('Login_Jwt_token');
          if(cookie_token){
            try{
              var result = await axios.post(requestedURL+'/awt_login',{token:cookie_token});                                     
                if(result.status==201){
                  console.log("result.data.payload.user.data : ",result.data.payload.user.data);
                  setUpdatedUserData(result.data.payload.user.data); 
                  dispatch(userData(result.data.payload.user.data));
                  setCustomerComponent('Booking');
                  if(location.search){
                    const params = new URLSearchParams(location.search);
                    const status = params.get('status');
                     if(status==='true'){
                        submitBooking();
                     }else{
                       Swal.fire(
                        "Payment Unsuccessful"
                       )
                     }
                  }
                }else
                {                        
                    Swal.fire("Login Yourself");
                    navigate('/');
                }             

            }catch(err){
                console.log("Error while dealing with login in login component",err);
            }                
          }
          else{
            Swal.fire("Login yourself");
            navigate('/');
          }
        }
        data();
    },[]);

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
            <h3 className='text-dark text-center' style={{ paddingLeft: "1rem" }}>{updatedUserData.Name}</h3>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-between">
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
                  <a className="nav-link" id="editprofile-tab" onClick={()=>{setCustomerComponent('Cancel')}} data-bs-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                   Cancel Booking 
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
                  <a className="nav-link " id="overview-tab" data-bs-toggle="pill" onClick={()=>{setreviewModel(true)}} href="#application" role="tab"  aria-controls="application" aria-selected="false">
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
                  <h4 className='text-light' style={{ paddingLeft: "1rem" }}>{updatedUserData.Name}</h4>
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
                 <p className='fs-3 fw-lighter' style={{marginLeft:'-20px',color:'white'}}>Account Detail</p>
                 <div className='acc-detail text-light'>
                 <hr></hr>

                   <h5 className='p-3 text-light'>{updatedUserData.Email}</h5>
                    <hr></hr>
                   <h5 className='p-3 text-light' >{updatedUserData.Gender}</h5>
                    <hr></hr>
                   <h5 className='p-3 text-light'>{updatedUserData.Contact_No}</h5>
                    <hr></hr>
                   <h5 className='p-3 text-light'>No of Bookings :- 10</h5>  
                    <hr></hr>
                   <h5 className='p-3 text-light'>No of Transactions :- 10</h5>   
                   <hr></hr>


                 </div>
              </div>              
            </div>
          </div>

          {
             (customercomponent==='Booking')
             ?
             <CustomerBooking />
             :
             (customercomponent==='Cancel')
             ?
             <CustomerCancelBooking />
             :
             ''
        }

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
 
        <Modal isOpen={reviewmodel} id='reviewmodel'>
            <ModalHeader toggle={()=>{setreviewModel(false)}}>Add Review</ModalHeader>
            <div className='container p-2'>
               <div className='row'>
                  <form method='post' onSubmit={handleSubmit1}>

                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Your Review</label>
                         <textarea className='form-control' placeholder='Enter Your Review' name="review"   onChange={handleInput1}></textarea>
                      </div>
                      <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                         <button type='submit' className='btn btn-dark text-light mx-2'>Add Review</button>
                         <input type='reset' className='btn btn-danger text-light mx-2' onClick={()=>{setreviewModel(false)}} value='Cancel'/>
                      </div>
                      
                  </form>
               </div>
            </div>
        </Modal>
        
    </>
  );
};

export default CustomerProfile;