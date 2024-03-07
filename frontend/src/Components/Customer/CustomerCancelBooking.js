import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import './Customer.css';
import axios from "axios";
import { requestedURL } from "../../urls";

export default function CustomerCancelBooking()
{
    const updatedUserData = useSelector(state=> state.userSlice.user_Data);
    const [cancelBookings,setCancelBookings] = useState([]);

    const fetchCanceledServices = async()=>{
        const id=updatedUserData._id;
        console.log("Id=>",id);
        const result = await axios.get(`${requestedURL}/getcancelservices/${id}`);
        console.log("Result =>",result);
        setCancelBookings(result.data.cancelBookings);
    }
    useEffect(()=>{    
    setTimeout(fetchCanceledServices,1000);
},[]);

    return(<>
        <div className="col-sm-12 col-md-10 col-lg-10">
                    <div>
                    <h3 style={{padding:"1rem",marginTop:"2rem"}}>Cancel Bookings</h3>
                    </div>
                    <div className="table-responsive" style={{backgroundColor:"white", marginTop:"1rem"}}>
                    <table className="table table-bordered table-hover">
                        <thead className="sticky-top">
                        <tr>
                            <th>S.No</th>
                            <th>Services</th>
                            <th>Date Of Service</th>
                            <th>Time Of Service</th>
                            <th>Total Amoount</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                (cancelBookings.length>0)?
                                    cancelBookings.map((data,index)=>{
                                return(
                                    <>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.ServiceName}</td>
                                            <td>{data.Date}</td>
                                            <td>{data.Time}</td>
                                            <td>Rs {data.TotalPrice}</td>
                                            <td>
                                                {
                                                    (data.Status === 'Cancel') ?
                                                    <button className='btn btn-outline-success'>Rebooking</button>
                                                    :
                                                    ''
                                                }
                                            </td>
                                        </tr>
                                    </>
                                );
                            })
                            :
                            <tr>
                               <td colSpan={6}>
                                  No Booking 
                               </td>
                            </tr>
                            }                    
                        
                        </tbody>
                    </table>
                    </div>
        </div>
    </>);
}