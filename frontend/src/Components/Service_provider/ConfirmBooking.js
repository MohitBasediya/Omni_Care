import './Servicprovider.css';
import {useSelector} from 'react-redux'; 
import { useState,useEffect } from 'react';
import { Modal,ModalHeader } from 'reactstrap';
import axios from 'axios';
import { requestedURLForServiceProvider } from '../../urls';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function ConfirmBooking(){
    const userData1 = useSelector(state => state.userSlice.user_Data[0]);
    const userData2 = useSelector(state => state.userSlice.user_Data[1]);
    const [updatedUserData, setUpdatedUserData] = useState(userData2);
    const [connfirmdata,setConfirmData] = useState([]);
    const Service_type = updatedUserData.Service_type;
    const [otpModal,setOtpModal] = useState(false);
    const [service,setService] = useState({});
    useEffect(()=>{
        const fetchdata = async()=>{
            const id=userData1._id;
            console.log("id : ",id);
            if(Service_type!=='Shifting Agency'){
                var result=await axios.get(`${requestedURLForServiceProvider}/serviceconfirmed/${id}`);
                if(result.status===201){
                    setConfirmData(result.data.confirmdata);
                }
            }else{
                const response = await axios.get(`${requestedURLForServiceProvider}/agency_bookingDataconfirmed/${id}`);
                  console.log("response ",response.data);
                  setConfirmData(response.data.confirmdata); 
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

    const openModal = (data)=>{
        setService({...service,['id']:data._id});
        setOtpModal(true);
    }
    const getOtp = (e)=>{
        setService({...service,['otp']:e.target.value});
    }    
    const completeBooking = async(e)=>{
        e.preventDefault();
        try{
            const result = await axios.post(requestedURLForServiceProvider+'/completeBooking',{service});
            if(result.status===201){
                Swal.fire({
                    icon:'success',
                    text:'Service Complete'
                })
                setOtpModal(false);
                  window.location.reload();
            }else if(result.status===203){
                Swal.fire({
                    icon:'error',
                    text:'Wrong Otp',
                    timer:3000
                })
                setOtpModal(false);
            }else if(result.status===500){
                Swal.fire({
                    icon:'error',
                    text:result.data.message,
                    timer:3000
                })
                setOtpModal(false);
            }
        }catch(error){
            console.log('error : ',error);
            Swal.fire({
                icon:'error',
                text:'Error while dealing with backend',
                timer:3000
            })
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
                            <th>Amount</th>
                            <th colSpan={2} className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>           
                        {
                            connfirmdata.map((data,index)=>{
                                return(
                                <tr>
                                  <td>{index+1}</td>
                                  <td>{data.Name}</td>
                                  <td>{data.ServiceName}</td>
                                  <td>{data.ServiceCategory}</td>
                                  <td>{data.Date}</td>
                                  <td>{data.Time}</td>    
                                  <td>{data.TotalPrice - (data.TotalPrice/100)*10}</td>    
                                  <td><button className='btn btn-outline-primary'>View</button></td>    
                                  <td><button className='btn btn-outline-success' onClick={()=>openModal(data)}>Complete Service</button></td>    
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
                            connfirmdata.map((data,index)=>{
                                return(
                                <tr>
                                  <td>{index+1}</td>
                                  <td>{data.Name}</td>
                                  <td>{formatDate(data.date)}</td>
                                  <td>{formatTime(data.date)}</td>
                                  <td>{data.fromLocation}</td>
                                  <td>{data.toLocation}</td>
                                  <td>{data.houseType}</td>
                                  <td>{data.shiftingType}</td>     
                                  <td><button className='btn btn-outline-success text-light'>Complete Booking</button></td>    
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            }
            </div>
            <Modal isOpen={otpModal} id='updatemodel'>          
              <ModalHeader toggle={()=>{setOtpModal((false))}}>Complete Service</ModalHeader>          
                <div className='container p-2'>
                    <div className='row'>
                        <form method='post' onSubmit={completeBooking}>
                            <div className='w-100 p-2'>
                              <label className='text-dark py-1 px-2 fs-5'>Enter OTP</label>
                              <input className='form-control' type='text' name='otp' onChange={(e)=>{getOtp(e)}} placeholder='Enter OTP'/>
                            </div>                            
                            <div className='w-100 py-2 px-3 d-flex justify-content-end'>
                              <button type='submit' className='btn btn-dark text-light mx-2'>Submit</button>
                              <input type='reset' className='btn btn-danger text-light mx-2' onClick={()=>{setOtpModal(false)}} value='Close' />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>                 
        </div> 
        
    );
}