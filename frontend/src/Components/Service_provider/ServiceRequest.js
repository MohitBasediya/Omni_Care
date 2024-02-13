import './Servicprovider.css';
import {useSelector} from 'react-redux'; 
import { useState,useEffect } from 'react';
import { Modal,ModalHeader } from 'reactstrap';
import axios from 'axios';
import { requestedURLForServiceProvider } from '../../urls';
import Swal from 'sweetalert2';
export default function ServiceRequest(){
    const [requestData,setRequestData] = useState({});
    const userData1 = useSelector(state => state.userSlice.user_Data[0]);
    const userData2 = useSelector(state => state.userSlice.user_Data[1]);
    const [updatedUserData, setUpdatedUserData] = useState(userData2);
    const [Service_type, setUpdatedUserData1] = useState(userData2.Service_type);
    const [servicerequest,setServiceRequest] = useState([]);
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
    const rightSideStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    };
    const buttonStyle1 = {
        padding: '10px 30px',
        border: 'none',
        fontWeight: 'bold',
        borderRadius: '14px',
        background: '#FFB649',
    };
    const buttonStyle2 = {
        padding: '10px 30px',
        marginLeft: '4px',
        border: 'none',
        fontWeight: 'bold',
        borderRadius: '14px',
        background: '#FFB649',
    };
    const userData=useSelector(state => state.userSlice.user_Data);
    const [agencyModal,setAgencyModal] = useState(false);
    return(  
        <div className="col-lg-12">
            <div className="table-responsive">
            {
                (Service_type!=='Shifting Agency')?
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>S.No</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Name</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Services</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Category</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Date</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Time</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Location</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>City</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>State</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Amount you get</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Accept</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Reject</th>
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
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>S.No</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Customer Name</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Service date</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Booking Time</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>fromLocation</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>ToLocation</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Shifting type</th>
                            <th style={{fontSize:'1.1rem', fontWeight:'bold'}}>Shifting Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
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
                              <button type='submit' className='btn btn-dark text-light mx-2'>Submit</button>
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