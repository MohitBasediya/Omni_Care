import Table from 'react-bootstrap/Table';
import { useEffect,useState } from 'react';
import { adminURl } from '../../urls';

import axios from 'axios';
function UserReview() {
    const [customerdata , setdata]= useState([]);

    useEffect(()=>{
        function data(){
            axios.get('http://localhost:3001/admin/UserReview')
        .then((response)=>{
            console.log("In The UserReview ")
            console.log(response);
            setdata(response.data.result);
        })
        .catch((err) => console.log(err))
    }
    data();
    },[]);

    function changeStatus(id) {
        console.log("Email=>",id);
        axios.post('http://localhost:3001/admin/updatReviewstatus',{id})
            .then((response) => {
                console.log("Response ==>", response);
                setdata(response.data.result);
            }).catch((err) => {
                console.log("Error ==>", err);
        })
      };
    return (
        <>
            <div className=" dataTable">
                <h3>
                    User Review
                </h3>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                    <div className='table-responsive'>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th> Name</th>
                                    <th> Email</th>
                                    <th> Contact_No</th>
                                    <th> Message</th>
                                    <th> Role</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                              
                                {
                                customerdata.map((data,index)=>{
                                    return(
                                        <tr>
                                        <td>{index+1}</td>
                                        <td>{data.user[0].Name}</td>
                                        <td>{data.user[0].Email}</td>
                                        <td>{data.user[0].Contact_No}</td>
                                        <td>{data.Text_Review}</td>
                                        <td>{data.user[0].User_Role}</td>
                                        <td><button type="button" class="btn btn-success w-100" onClick={()=>{changeStatus(data._id)}} >{data.Status}</button></td>
                                        </tr>
                                    )
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
export default UserReview;