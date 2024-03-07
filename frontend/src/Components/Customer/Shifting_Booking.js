import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Customer.css';
import axios from "axios";
import { requestedURL } from "../../urls";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Customer_Modal from './Customer_Modal.js';
export default function Shifting_Booking() {

  const [bookingData,setBookingData]=useState([]);
  const [confirmBooking,setConfirmBooking] = useState({});
  const updatedUserData = useSelector(state=> state.userSlice.user_Data);
  const [paymentModal,setPaymentModal] = useState(false);
  console.log('updatedUserData     ', updatedUserData.Email);

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
  console.log("booking ",updatedUserData);
    const fetchservice = async () => {
      try {
        console.log('fetch service ',updatedUserData);
        const id = updatedUserData._id;
        const result = await axios.get(requestedURL +`/getBooking/${id}`);
        if (result.status === 201) {
            console.log("iffff")
          console.log('resulttt : ',result.data.bookingData);
          setBookingData(result.data.bookingData);
        }
      } catch (error) {
        console.log('errorpop : ', error);
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
  
  return (
        <>
          <div className="col-sm-12 col-md-10 col-lg-10">
            <div>
              <h3 style={{padding:"1rem",width:"10rem",marginTop:"2rem"}}>Bookings</h3>
            </div>
            <div className="table-responsive" style={{backgroundColor:"white", marginTop:"1rem"}}>
              <table className="table table-bordered table-hover">
                <thead className="sticky-top">
                  <tr>
                    <th>S.No</th>
                    <th>Services</th>
                    <th>Date Of Service</th>
                    <th>Time Of Service</th>
                    <th>Total Amount</th>
                    <th>Service Provider</th>
                    <th>Status</th>
                    <th colSpan={2} className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      (bookingData.length>0)?
                        bookingData.map((booking,index)=>{
                            
                        return(
                          <tr>
                             <td>{index+1}</td>
                             <td>{booking.houseType}</td>
                             <td>{booking.date}</td>
                             <td>{booking.shiftingType}</td>
                             <td>{booking.toLocation}</td>
                             <td>{
                                  (booking.Status==='Accepted' || booking.Status==='Confirm')?
                                   booking.ServiceProviderName
                                   :
                                   'Pending'
                                  }
                              </td>
                             <td>{booking.Status}</td>
                             <td>
                                 {
                                  (booking.Status==='Pending')?
                                      <button className='btn btn-outline-secondary'>Pending</button>
                                    :
                                  (booking.Status==='Accepted')?
                                      <button className='btn btn-outline-success' onClick={()=>{openModal(booking)}}>Pay Now</button>
                                    :
                                  (booking.Status==='Cancel')?
                                      ''
                                    :  
                                      <button className='btn btn-outline-primary'>View</button>
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
          </>
          
  );
}
