import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Customer.css';
import axios from "axios";
import { requestedURL } from "../../urls";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Customer_Modal from './Customer_Modal.js';
import { Modal } from "reactstrap";
import profile from '../../images/OmniCareLogo.png';
export default function CustomerBooking() {

  const [bookingData,setBookingData]=useState([]);
  const [confirmBooking,setConfirmBooking] = useState({});
  const updatedUserData = useSelector(state=> state.userSlice.user_Data);
  const [paymentModal,setPaymentModal] = useState(false);
  const [viewbtnModal,setViewModal] = useState(false);
  const [viewAllBookingData, setAllBookingData] = useState({});

  const cancelBooking = async(booking)=>{
     try{
       const today = new Date();
       const [hours, minutes] = booking.Time.split(':');
       const bookingDate = new Date(booking.Date);
       const bookingTime = new Date();
       bookingTime.setHours(hours);
       bookingTime.setMinutes(minutes);
       const id=booking._id;
        if(bookingDate - today >0) {
             var result = await axios.get(`${requestedURL}/cancelBooking/${id}`);
             if(result.status===201){
                Swal.fire("Booking canceled");
             }
        }else if((bookingTime.getTime() - today.getTime())>=1){
              var result = await axios.get(`${requestedURL}/cancelBooking/${id}`);
              if(result.status===201){
                Swal.fire("Booking canceled");
              }
        }else{
              Swal.fire("You can't cancelled a booking according to Terms & condition");
        }
     }catch(error){
       console.log('error : ',error);
     }
 }

 useEffect(() => {
    const fetchservice = async () => {
      try {
        const id = updatedUserData._id;
        const result = await axios.get(requestedURL +`/getServices/${id}`);
        if (result.status === 201) {
          setBookingData(result.data.BookingData);
        }
      } catch (error) {
        console.log('error : ', error);
      }
    }
    if(updatedUserData){
      fetchservice();
    }
}, []); 


  const openModal = (booking)=>{
        setConfirmBooking(booking);
        setPaymentModal(true);
  }

  const openViewModal = (booking) => {
    setAllBookingData(booking); 
    setViewModal(true); 
  }
  
  return (
        <>
          <div className="col-sm-12 col-md-10 col-lg-10">
            <div>
              <h3 style={{padding:"1rem",marginTop:"2rem"}}>Bookings</h3>
            </div>
            <div className="table-responsive" style={{backgroundColor:"white", marginTop:"1rem"}}>
              <table className="table table-bordered table-hover">
                <thead className="sticky-top">
                  <tr>
                    <th>S.No</th>
                    <th>Services</th>
                    <th>Status</th>
                    <th colSpan={2} className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      (bookingData.length>0)?
                        bookingData.map((booking,index)=>{
                        return(
                          (booking.Status!=='Cancel')?
                          <tr>
                             <td>{index+1}</td>
                             <td>{booking.ServiceName}</td>
                             <td>{booking.Status}</td>
                             <td>
                                 {
                                  (booking.Status==='Pending')?
                                      <button className='btn btn-outline-secondary'>Pending</button>
                                    :
                                  (booking.Status==='Accepted')?
                                      <button className='btn btn-outline-success' onClick={()=>{openModal(booking)}}>Pay Now</button>
                                    :
                                    <button className='btn btn-outline-primary' onClick={()=>{openViewModal(booking)}}>View</button>
                                 }
                             </td>
                             <td>
                              {
                                (booking.Status==='Completed')?
                                <button className="btn btn-outline-warning">Bill</button>
                                :
                                <button className="btn btn-outline-danger" onClick={()=>{cancelBooking(booking)}}>Cancel</button>
                              }
                             </td>
                          </tr>
                          :''
                
                        );                        
                      })                      
                      :
                      <tr>
                        <td colspan={8}>No Booking Found </td>
                      </tr>
                  }                  
                </tbody>
              </table>
            </div>
          </div>
          {
            (paymentModal)?
            <Customer_Modal booking={confirmBooking} userData={updatedUserData}/>:
            ''
          }

          {/* Modal for View button */}
            <Modal isOpen={viewbtnModal} size="lg" id="customerviewmodal" toggle={() => setViewModal(false)}>
              <div className="modal-header">
                <h2>Booking Details</h2>
                <button type="button" className="close btn btn-dark fw-bolder" style={{color:'white'}} onClick={() => setViewModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-start">
                    <div className="p-2 bg-light" style={{width:'150px',height:'150px',borderRadius:'50%'}}>
                       <img src={profile} className="w-100 h-100" style={{borderRadius:'50%'}} />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <p>Service: {viewAllBookingData.ServiceName}</p>
                  <p>Date: {viewAllBookingData.Date}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <p>Time: {viewAllBookingData.Time}</p>
                  <p>Total Amount: {viewAllBookingData.TotalPrice}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <p>Service Type: {viewAllBookingData.ServiceType}</p>
                  <p>Service Category: {viewAllBookingData.ServiceCategory}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <p>Address: {viewAllBookingData.Address}</p>
                  <p>City: {viewAllBookingData.City}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <p>State: {viewAllBookingData.State}</p>
                  <p>ServiceProviderName: {viewAllBookingData.ServiceProviderName}</p>
                </div>
                {/* Add more details here as needed */}
              </div>
            </Modal>
          </>
          
  );
}
