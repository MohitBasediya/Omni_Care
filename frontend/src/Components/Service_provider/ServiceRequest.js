import './Servicprovider.css';
import {useSelector} from 'react-redux'; 
import { useState,useEffect } from 'react';
import { Modal,ModalHeader } from 'reactstrap';
import axios from 'axios';
import { requestedURLForServiceProvider } from '../../urls';
import Swal from 'sweetalert2';
export default function ServiceRequest(){
    const userData1 = useSelector(state => state.userSlice.user_Data[0]);
    const userData2 = useSelector(state => state.userSlice.user_Data[1]);
    const [updatedUserData, setUpdatedUserData] = useState(userData2);
    const [Service_type, setServiceType] = useState(userData2.Service_type);
    const [servicerequest,setServiceRequest] = useState([]);
    const [agencydata,setAgencyData] = useState({});
    const userData=useSelector(state => state.userSlice.user_Data);
    const [agencyModal,setAgencyModal] = useState(false);
    useEffect(()=>{
        const fetchdata = async()=>{
            if(Service_type!=='Shifting Agency'){
                var result=await axios.get(`${requestedURLForServiceProvider}/servicerequest/${Service_type}`);
                if(result.status===201){
                    setServiceRequest(result.data.requestdata);
                }
            }else{
                const provider_id=userData1._id
                const response = await axios.get(`${requestedURLForServiceProvider}/agency_bookingData/${provider_id}`);
                    console.log("response    ",response.data);
                    setServiceRequest(response.data.requestdata); 
            }
        }
        fetchdata();
    },[]);
    
    const acceptRequest=async(id)=>{
         try{
             var result = await axios.post(requestedURLForServiceProvider+"/acceptrequest",{id,updatedUserData});
             if(result.status===201){
                Swal.fire("Reuest Accepted Wait for Customer confirmation");
             }
         }catch(error){
            console.log('error ',error);
         }
    }

    const acceptAgencyRequest=async(id)=>{
        setAgencyData({...agencydata,['bookingId']:id,['Status']:'Accept'});
        setAgencyModal(true);
    }

    const handleInput=(e)=>{
        setAgencyData({...agencydata,[e.target.name]:e.target.value});
    }
    
    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    function formatTime(date) {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return new Date(date).toLocaleTimeString(undefined, options);
    }

    const submitData = async()=>{
        try {               
            const data = await axios.post(requestedURLForServiceProvider + "/agency_bookingAccept", {agencydata}); 
        } 
        catch (error) {
            console.error('Error updating booking status:', error);
            Swal.fire("Error while senting Request");
        }
    }
    return(  
        <div className="col-lg-12">
            <div className="table-responsive">
            {
                (Service_type!=='Shifting Agency')?
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Services</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Amount you get</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>           
                        {
                            servicerequest.map((request,index)=>{
                                console.log("service request ",servicerequest,"request ",request)
                                return(
                                <tr>
                                  <td>{index+1}</td>
                                  <td>{request.Name}</td>
                                  <td>{request.ServiceName}</td>
                                  <td>{request.ServiceCategory}</td>
                                  <td>{request.Date}</td>
                                  <td>{request.Time}</td>
                                  <td>{request.Address}</td>
                                  <td>{request.City}</td>    
                                  <td>{request.State}</td>    
                                  <td>{request.TotalPrice - (request.TotalPrice/100)*10}</td>    
                                  <td><button className='btn btn-success text-light' onClick={()=>{acceptRequest(request._id)}}>Accept</button></td>    
                                  <td><button className='btn btn-danger text-light'>Reject</button></td>
                                </tr>
                            )})
                        }
                   </tbody>
                </table>
                :
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Customer Name</th>
                            <th>Service date</th>
                            <th>Booking Time</th>
                            <th>fromLocation</th>
                            <th>ToLocation</th>
                            <th>House type</th>
                            <th>Shifting Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            servicerequest.map((request,index)=>{
                                console.log("service request ",servicerequest,"request ",request)
                                return(
                                <tr>
                                  <td>{index+1}</td>
                                  <td>{request.Name}</td>
                                  <td>{formatDate(request.date)}</td>
                                  <td>{formatTime(request.date)}</td>
                                  <td>{request.fromLocation}</td>
                                  <td>{request.toLocation}</td>
                                  <td>{request.houseType}</td>
                                  <td>{request.shiftingType}</td>     
                                  <td><button className='btn btn-success text-light' onClick={()=>{acceptAgencyRequest(request._id)}}>Accept</button></td>    
                                  <td><button className='btn btn-danger text-light'>Reject</button></td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            }
            </div>
            <Modal isOpen={agencyModal} id='updatemodel'>          
              <ModalHeader toggle={()=>{setAgencyModal((false))}}></ModalHeader>          
                <div className='container p-2'>
                    <div className='row'>
                        <form method='post' onSubmit={submitData}>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter Driver Name</label>
                              <input className='form-control' type='text' onChange={(e)=>{handleInput(e)}} placeholder='Enter Driver Name'/>
                            </div>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter Vehicle Number</label>
                              <input className='form-control' type='text' onChange={(e)=>{handleInput(e)}} placeholder='Enter Vehicle Number'/>
                            </div>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter travel time</label><br />
                              <input className='form-control' type='text' onChange={(e)=>{handleInput(e)}} placeholder='Enter travel time'/>                         
                            </div>
                            <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                              <button type='submit' className='btn btn-dark text-light mx-2' >Submit</button>
                              <input type='reset' className='btn btn-danger text-light mx-2' onClick={()=>{setAgencyModal(false)}} value='Close' />
                            {/* <button className='btn btn-danger text-light' onClick={()=>{setIsUpdateModel(false)}}>Close</button> */}
                            </div>
                        </form>
                    </div>
                </div>
        </Modal>                 
        </div> 
        
    );
}