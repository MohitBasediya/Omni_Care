import axios from 'axios';
import { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import { adminURl } from '../../urls';
function Customer() {


    const [customerdata , setdata]= useState([]);
    useEffect(()=>{
        function data(){
        axios.get('http://localhost:3001/admin/customer')
        .then((response)=>{
            console.log("in then block")
            console.log(response);
            setdata(response.data.customer);
        })
        .catch((err) => console.log(err))
    }
    data();
    },[])
    return (
        <>
            <div className=" dataTable" >
            <h3>
                Customer
            </h3>
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="main-card mb-3 card">
                <div className='table-responsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th> Name</th>
                                <th> Role</th>
                                <th> Email</th>
                                <th> Gender</th>
                                <th>Contact</th>
                                

                            </tr>
                        </thead>
                        <tbody>
                            {
                                customerdata.map((data,index)=>{
                                    return(
                                        <tr>
                                        <td>{index+1}</td>
                                        <td>{data.Name}</td>
                                        <td>{data.User_Role}</td>
                                        <td>{data.Email}</td>
                                        <td>{data.Gender}</td>
                                        <td>{data.Contact_No}</td>
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
export default Customer;