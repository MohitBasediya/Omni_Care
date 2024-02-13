import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { adminURl } from '../../urls';
import { useEffect, useState } from 'react';
function ServiceProvider() {

    var [serviceprovider, setdata] = useState([]);
    
    useEffect(() => {
        function data() {
            axios.get('http://localhost:3001/admin/serviceprovider')
                .then((response) => {
                    console.log("in then block")
                    console.log("helloo------------------------> ", response);

                    setdata(response.data.RegistrationData);
                    console.log("state data on ",serviceprovider );
                })
                .catch((err) => console.log(err))
        }
        data();
    },[]);

   
    function changeStatus(Email) {
        console.log("Email=>",Email);
        axios.post(adminURl + '/updatstatus',{Email})
            .then((response) => {
                console.log("Response ==>", response);
                setdata(response.data.RegistrationData);
            }).catch((err) => {
                console.log("Error ==>", err);
            })
    }

    return (
        <>
            <div className="dataTable">
                <h2>
                    Service Provider
                </h2>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                        <div className='table-responsive'>
                            <table className='table table-striped' >
                                <thead>
                                    <tr>
                                        <th>Serial No.</th>
                                        <th> Name</th>
                                        <th> Email</th>
                                        <th> Phone</th>
                                        <th> Address</th>
                                        <th>Service Name</th>
                                        <th>Service Type</th>
                                        <th>Account Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        serviceprovider.map((data, index) => {
                                            console.log('data ', data);
                                            return (
                                                <tr key={data._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.Name}</td>
                                                    <td>{data.Email}</td>
                                                    <td>{data.Contact_No}</td>
                                                    <td>{data.Address},{data.City},{data.State}</td>
                                                    <td>{data.Service_type}</td>
                                                    <td>{data.Service_category}</td>
                                                    <td>{data.Status}</td>

                                                    <td><button className='btn btn-success' onClick={()=>{changeStatus(data.Email)}} >Update Status</button></td>
                                                </tr>
                                            )

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
export default ServiceProvider;
