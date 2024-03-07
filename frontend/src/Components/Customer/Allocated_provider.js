import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Customer.css';
import axios from "axios";
import { requestedURL } from "../../urls";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

export function Allocated_provider(){
    const [providerdata,setProviderData] = useState([]);
    const updatedUserData = useSelector(state=> state.userSlice.user_Data);
    useEffect(()=>{
        var fetchprovider = async()=>{
            const id = updatedUserData._id;
            var result = await axios.get(`${requestedURL}/getallocatedproviderdata/${id}`);
            if(result.status===201){
                setProviderData(result.data.providerData);
            }else if(result.status===500){
                Swal.fire({
                    icon:'error',
                    text:'Error while fetching data'                    
                });
            }
        }
        fetchprovider();
    },[]);

    return(
        <>
            <div className="col-sm-12 col-md-10 col-lg-10">
                <div>
                    <h3 style={{padding:"1rem",marginTop:"2rem"}}>Allocated Service Provider</h3>
                </div>
                <div className="table-responsive" style={{backgroundColor:"white", marginTop:"1rem"}}>
                    <table className="table table-bordered table-hover">
                        <thead className="sticky-top">
                        <tr>
                            <th>S.No</th>
                            <th>Services</th>
                            <th>Date Of Service</th>
                            <th>Time Of Service</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                (providerdata.length>0)?
                                    providerdata.map((data,index)=>{
                                return(
                                    <>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.Name}</td>
                                            <td>{data.Email}</td>
                                            <td>{data.Contact_No}</td>                                            
                                        </tr>
                                    </>
                                );
                            })
                            :
                            <tr>
                               <td colSpan={4}>
                                  No Booking 
                               </td>
                            </tr>
                            }                    
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}