import profile from '../../images/Userprofile.png';
import ServiceOverview from './ServiceProvider_overview.js';
import ServiceRequest from './ServiceRequest.js';
import ProfileData from './ProfileData.js';
import { useState } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import './Servicprovider.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { requestedURLForServiceProvider } from '../../urls.js';
import { userData } from '../../store/userSlice.js';
import sidePhoto from "../../images/cleaner1.jpg"




export default function ServiceProviderProfile() {
  const [component, setComponent] = useState('profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData1 = useSelector(state => state.userSlice.user_Data[0]);
  const userData2 = useSelector(state => state.userSlice.user_Data[1]);


  const [updatedUserData, setUpdatedUserData] = useState(userData1);
  const [updatedUserData1, setUpdatedUserData1] = useState(userData2);
  console.log("Service type : ",updatedUserData1.Service_type);
  const [reviewmodel,setreviewModel]=useState(false);
  const [AddReview,setReviewData] = useState("");
  const [isupdatemodel, setIsUpdateModel] = useState(false);

  console.log("Provider Data ", updatedUserData);
  console.log("Provider Data ", updatedUserData1);
  
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value
    });

  }

  const handleInput1 = (event) => {
    const { name, value } = event.target;
    if(event.target.type==='checkbox'){
			if(updatedUserData1[event.target.name]){
        setUpdatedUserData1({...updatedUserData1,[event.target.name]:updatedUserData1[event.target.name]+" "+event.target.value});
			}
			else{
				setUpdatedUserData1({...updatedUserData1,[event.target.name]:event.target.value});	
			}
		    // validateField(e.target.name , e.target.value);
		}
    else{
    setUpdatedUserData1({
      ...updatedUserData1,
      [name]: value
    });
   }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("updatedUserData=>--------------------");
      console.log(updatedUserData);

      console.log("updatedUserData1=>");
      console.log(updatedUserData1);

      var result = await axios.post(requestedURLForServiceProvider + "/updateprovider", { updatedUserData, updatedUserData1 });

      console.log("Result Updated Data=>", result);

      if (result.status === 201) {
        setUpdatedUserData(updatedUserData);

        setUpdatedUserData1(updatedUserData1);
        console.log("after update ", result.data.updatedUser)
        dispatch(userData(result.data.updatedUser));
        setIsUpdateModel(false);
        navigate('/Service_provider_profile');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleInput2 = (event)=>{
    const {name,value} = event.target;
    setReviewData(value);
  }
  const handleSubmit1 = async(event)=>{
    event.preventDefault();
    try{
      const data={
        review:AddReview,
        userId:updatedUserData._id
      }
      console.log("Add Review=>",AddReview);

      var result = await axios.post( requestedURLForServiceProvider+ "/AddReview",data);
      console.log("Result Updated Data=>",result);

      if(result.status==201){
        setReviewData(AddReview);
        setreviewModel(false);
        navigate('/Service_provider_profile');
      }
    }catch(err){
      console.log(err);
    }
  }



  return (
    //  ===== ===== Main-Container ===== ===== 
    <>
      
     

<section class="container-fluid" style={{backgroundColor:"#F9F5F4 ;"}}>

<div class="C1">
  <div class="container m-auto p-5 ">
    <div class="row justify-content-between text-center align-items-center p-5">


      <div class="col-lg-4 col-md-4  col-12  "style={{padding:'4rem;'}} >
        <div class="card  h-100" style={{width: "18rem;",padding:'3rem'}}>
          <img class="card-img-top img" src={profile} alt="Card image cap"/>
          <div class="card-body">
            <h3 class="card-title">{updatedUserData.Name}</h3>
            <h3 class="card-text">{updatedUserData1.Service_type}</h3>
            <h4 class="card-text">{updatedUserData1.Address}</h4>
          </div>
        </div>
      </div>


      <div class="col-lg-7 col-md-7  col-12  img_container p-5 ">
        <img src={sidePhoto}alt="" class="side_image rounded-4"/>
      </div>

    </div>  

  </div>
</div>

<div class="hr-line"></div>


<nav class="navbar navbar-expand-lg navbar-light bg-light bg-shadow mb-5">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav w-75 mx-auto justify-content-around">
        <li class="nav-item ">
          <a class="nav-link text-dark" style={{cursor:'pointer'}}  onClick={() => { setComponent('profile') }}>Profile</a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-dark" style={{cursor:'pointer'}} onClick={() => { setIsUpdateModel(true) }}>Edit Profile</a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-dark" style={{cursor:'pointer'}} onClick={()=>{setreviewModel(true)}}>Review</a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-dark" style={{cursor:'pointer'}} onClick={() => { setComponent('request') }}>Request</a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-dark" style={{cursor:'pointer'}} >Transaction</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
{
              (component === 'profile') ?
                <ProfileData />
                :
                (component === 'overview') ?
                  <ServiceOverview />
                  :
                  (component === 'request') ?
                    <ServiceRequest />
                    :
                    ''
            }
</section>
      <Modal isOpen={isupdatemodel} id='updatemodel'>
        <ModalHeader toggle={() => { setIsUpdateModel((false)) }}>Update Detail</ModalHeader>
        <div className='container p-2'>
          <div className='row'>
            <form method='post' onSubmit={handleSubmit}>
              <div className='w-100 p-2'>
                <label className='text-dark py-1 px-2 fs-5'>Enter Name</label>
                <input className='form-control' type='text' name='Name' placeholder='Enter Name' defaultValue={updatedUserData.Name} onChange={handleInput} />
              </div>
              <div className='w-100 p-2'>
                <label className='text-dark py-1 px-2 fs-5'>Contact Number</label>
                <input className='form-control' type='text' name='Contact_No' placeholder='Enter Number' defaultValue={updatedUserData.Contact_No} onChange={handleInput} />
              </div>

              <div className='w-100 p-2'>
                <label className='text-dark py-1 px-2 fs-5'>Gender</label><br />
                <input className='form-check-input' name="Gender" value='Male' type='radio' placeholder='Enter Number' checked={updatedUserData.Gender === 'Male'} onChange={handleInput} /><lable className='text-dark px-2 pt-2'> Male</lable>
                <input className='form-check-input' name="Gender" value='Female' type='radio' placeholder='Enter Number' checked={updatedUserData.Gender === 'Female'} onChange={handleInput} /><lable className='text-dark px-2 pt-2'> Female</lable>
              </div>

              <div className='w-100 p-2'>
                <label className='text-dark py-1 px-2 fs-5'>Address</label><br />
                <input className='form-control' type='text' name='Address' placeholder='Enter Addres' defaultValue={updatedUserData1.Address} onChange={handleInput1} />
              </div>
              {
                (updatedUserData1.Service_type !=='Shifting Agency')?
                <div className="w-100 p-2">
                  <input type="checkbox" className="form-check-input mx-4" name="Service_category" value="Primary" id='Primary' checked={updatedUserData1.Service_category.includes('Primary')} onChange={handleInput1} />Primary
                  <input type="checkbox" className="form-check-input mx-4" name="Service_category" value="Secondary" id='Secondary' checked={updatedUserData1.Service_category.includes('Secondary')}onChange={handleInput1}  />Secondary
                  <input type="checkbox" className="form-check-input mx-4" name="Service_category" value="Tertiary" id='Tertiary' checked={updatedUserData1.Service_category.includes('Tertiary')}onChange={handleInput1}  />Tertiary
                </div>
                :
                ''
              }
              <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                <button type='submit' className='btn btn-dark text-light mx-2'>Update</button>
                <input type='reset' className='btn btn-danger text-light mx-2' onClick={() => { setIsUpdateModel(false) }} value='Close' />
                {/* <button className='btn btn-danger text-light' onClick={()=>{setIsUpdateModel(false)}}>Close</button> */}
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
                         <textarea className='form-control' placeholder='Enter Your Review' name="review"   onChange={handleInput2}></textarea>
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
}