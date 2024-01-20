import profile from '../../images/Userprofile.png';
import ServiceOverview from './ServiceProvider_overview.js'; 
import ServiceRequest from './ServiceRequest.js';
import ProfileData from './ProfileData.js';
import { useState } from 'react';
import { Modal,ModalHeader } from 'reactstrap';
import './Servicprovider.css';
export default function ServiceProviderProfile() {
    const [isupdatemodel,setIsUpdateModel]=useState(false);
    const [component,setComponent]=useState('profile');    
    return (
        //  ===== ===== Main-Container ===== ===== 
      <>
        <div className='container1' style={{ display: 'block',height:'auto'}}>
            <div className="container py-4" >
                <div className="row">
                    <div className="col-lg-3 col-sm-12" style={{ backgroundColor: "#FFC737" }}>
                        <section className="userProfile card">
                            <div className="profile">
                                <figure><img src={profile} alt="profile" style={{ width: "200px", height: "200px" }} /></figure>
                            </div>
                        </section>
                        <div className="profile-tab-nav border-right" style={{ marginTop: "4rem" }}>
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link active" id="profile-tab" onClick={()=>{setComponent('profile')}} data-bs-toggle="pill" href="#account" role="tab"
                                    aria-controls="account" aria-selected="true">
                                    Profile
                                </a>
                                <a className="nav-link" id="editprofile-tab" onClick={()=>{setIsUpdateModel(true)}} data-bs-toggle="pill" href="#password" role="tab"
                                    aria-controls="password" aria-selected="false">
                                    Edit Profile
                                </a>
                                <a className="nav-link" id="overview-tab" onClick={()=>{setComponent('overview')}} data-bs-toggle="pill" href="#application" role="tab"
                                    aria-controls="application" aria-selected="false">
                                    Overview
                                </a>
                                <a className="nav-link" id="request-tab" onClick={()=>{setComponent('request')}} data-bs-toggle="pill" href="#notification" role="tab"
                                    aria-controls="notification" aria-selected="false">
                                    Requests
                                </a>
                            </div>
                        </div>
                    </div>
                    {
                         (component==='profile')?
                           <ProfileData/>
                        :
                         (component==='overview')?
                           <ServiceOverview/>
                        :
                         (component==='request')?
                           <ServiceRequest/>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
        <Modal isOpen={isupdatemodel} id='updatemodel'>          
          <ModalHeader toggle={()=>{setIsUpdateModel((false))}}>Update Detail</ModalHeader>          
            <div className='container p-2'>
               <div className='row'>
                  <form method='post'>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Enter Name</label>
                         <input className='form-control' type='text' placeholder='Enter Name'/>
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Contact Number</label>
                         <input className='form-control' type='text' placeholder='Enter Number'/>
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Gender</label><br />
                         <input className='form-check-input' value='Male' type='radio' placeholder='Enter Number'/><lable className='text-dark px-2 pt-2'> Male</lable>
                         <input className='form-check-input' value='Female' type='radio' placeholder='Enter Number'/><lable className='text-dark px-2 pt-2'> Female</lable>
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Address</label><br />
                         <input className='form-control' type='text' placeholder='Enter Addres'/>                         
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Select State</label><br />
                         <select className='form-control' >
                         </select>
                      </div>
                      <div className='w-100 p-2'>
                         <label className='text-dark py-1 px-2 fs-5'>Select City</label><br />
                         <select className='form-control'>
                         </select>
                      </div>
                      <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                         <button type='submit' className='btn btn-dark text-light mx-2'>Update</button>
                         <input type='reset' className='btn btn-danger text-light mx-2' onClick={()=>{setIsUpdateModel(false)}} value='Close' />
                         {/* <button className='btn btn-danger text-light' onClick={()=>{setIsUpdateModel(false)}}>Close</button> */}
                      </div>
                  </form>
               </div>
            </div>
        </Modal>
    </>
    );
}