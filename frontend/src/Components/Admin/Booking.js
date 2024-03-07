import axios from 'axios';
import { useEffect, useState } from 'react';

function AllBooking(){
    var [reqUserBookingData, setUserBookingData] = useState([]);

    useEffect(()=>{
        function data(){
            axios.get('http://localhost:3001/admin/allbooking')
            .then((response)=>{
                setUserBookingData(response.data.reqBookingsData);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        data();
    },[]);

    return (
        <>
            <div className="dataTable">
                <h2>
                    Booking
                </h2>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                        <div className='table-responsive'>
                            <table className='table table-striped' >
                                <thead>
                                    <tr>
                                        <th>Serial No.</th>
                                        <th>Customer Name</th>
                                        <th>Service Provider Name</th>
                                        <th>Service Name</th>
                                        <th>Service Category</th>
                                        <th>Service Type</th>
                                        <th>Booking Date</th>
                                        <th>Booking Time</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reqUserBookingData.map((data,index)=>{
                                            console.log("data==>",data);
                                            return(
                                                <>
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{data.CustomerName}</td>
                                                        <td>{data.ServiceProviderName}</td>
                                                        <td>{data.ServiceName}</td>
                                                        <td>{data.ServiceCategory}</td>
                                                        <td>{data.ServiceType}</td>
                                                        <td>{data.Date}</td>
                                                        <td>{data.Time}</td>
                                                        <td>{data.Address}</td>
                                                        <td>{data.Status}</td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AllBooking;