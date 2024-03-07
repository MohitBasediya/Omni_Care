import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
function CancelOrder() {
    var [reqCancelBookings,setCancelBookings] = useState([]);

    useEffect(()=>{
        function data(){
            axios.get('http://localhost:3001/admin/allcancelbooking')
            .then((response)=>{
                console.log("In then block");
                console.log("==>",response);
                setCancelBookings(response.data.reqCancelBookingData);
                console.log("reqCancelBookings",reqCancelBookings);
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
                <h3>
                    Customer
                </h3>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                    <div className='table-responsive'>
                        <Table striped bordered hover>
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
                                    reqCancelBookings.map((data,index)=>{
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
                        </Table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
export default CancelOrder;