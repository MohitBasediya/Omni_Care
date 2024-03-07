import './Servicprovider.css';
import {useSelector} from 'react-redux'; 
import { useState,useEffect } from 'react';
import { Modal,ModalHeader } from 'reactstrap';
import axios from 'axios';
import { requestedURLForServiceProvider } from '../../urls';
import Swal from 'sweetalert2';
export default function AcceptedBooking(){
    const userData1 = useSelector(state => state.userSlice.user_Data[0]);
    const userData2 = useSelector(state => state.userSlice.user_Data[1]);
    const [updatedUserData, setUpdatedUserData] = useState(userData2);
    const [acceptedrequest,setAcceptedRequest] = useState([]);
    const Service_type = updatedUserData.Service_type;
    const [agencyModal,setAgencyModal] = useState(false);
    useEffect(()=>{
        const fetchdata = async()=>{
            const id=userData1._id;
            console.log("id : ",id);
            if(Service_type!=='Shifting Agency'){
                var result=await axios.get(`${requestedURLForServiceProvider}/serviceaccepted/${id}`);
                if(result.status===201){
                    setAcceptedRequest(result.data.accepteddata);
                }
            }else{
                const response = await axios.get(`${requestedURLForServiceProvider}/agency_bookingDataaccepted/${id}`);
                  console.log("response ",response.data);
                  setAcceptedRequest(response.data.accepteddata); 
            }
        }
        fetchdata();
    },[]);
    
    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    function formatTime(date) {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return new Date(date).toLocaleTimeString(undefined, options);
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
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>           
                        {
                            acceptedrequest.map((accept,index)=>{
                                return(
                                <tr>
                                  <td>{index+1}</td>
                                  <td>{accept.Name}</td>
                                  <td>{accept.ServiceName}</td>
                                  <td>{accept.ServiceCategory}</td>
                                  <td>{accept.Date}</td>
                                  <td>{accept.Time}</td>
                                  <td>{accept.Address}</td>
                                  <td>{accept.City}</td>    
                                  <td>{accept.State}</td>    
                                  <td>{accept.TotalPrice - (accept.TotalPrice/100)*10}</td>    
                                  <td><button className='btn btn-outline-primary' >View</button></td>    
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
                            acceptedrequest.map((accept,index)=>{
                                return(
                                <tr>
                                  <td>{index+1}</td>
                                  <td>{accept.Name}</td>
                                  <td>{formatDate(accept.date)}</td>
                                  <td>{formatTime(accept.date)}</td>
                                  <td>{accept.fromLocation}</td>
                                  <td>{accept.toLocation}</td>
                                  <td>{accept.houseType}</td>
                                  <td>{accept.shiftingType}</td>     
                                  <td><button className='btn btn-outline-primary text-light'>View</button></td>    
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
                        <form method='post'>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter Driver Name</label>
                              <input className='form-control' type='text' placeholder='Enter Driver Name'/>
                            </div>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter Vehicle Number</label>
                              <input className='form-control' type='text' placeholder='Enter Vehicle Number'/>
                            </div>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter travel time</label><br />
                              <input className='form-control' type='text' placeholder='Enter travel time'/>                         
                            </div>
                            <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                              <button type='submit' className='btn btn-dark text-light mx-2' >Submit</button>
                              <input type='reset' className='btn btn-danger text-light mx-2' onClick={()=>{setAgencyModal(false)}} value='Close' />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>                 
        </div> 
        
    );
}