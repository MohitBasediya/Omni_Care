import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

function ProviderPayment(){
    const location = useLocation();
    const pathname = location.pathname;

    var [paymentData, setPaymentData] = useState([]);

    useEffect(()=>{
        function getdData(){
            axios.get('http://localhost:3001/admin/allpaymentdata')
            .then((response)=>{
                if(response.status===201){
                    setPaymentData(response.data.resultPayment);
                }
                else if(response.status===203){
                    setPaymentData([]);
                }
                else if(response.status===500){
                    Swal.fire({
                        icon:'error',
                        text:'Error while fetching data'
                    });
                } 
            })
            .catch((err)=>{
                console.log(err);
                Swal.fire({
                    icon:'error',
                    text:'Error while dealing with backend'
                });
            });
        }
        getdData();
    },[]);

    const getPayment = async (data)=>{
        console.log("on getPayment",data);
        try{
            const stripe=await loadStripe('pk_test_51O7qF0SJUnxcOIoS0sB7ANA2hIetDRhpRNTB4adPmYuOBzByrlhxBJaD9v5FFrUAlh9btXzUBeju1uuUHqZmbGgG00rLZ3hiG2');
            axios.post('http://localhost:3001/admin/payment',{data,pathname})
            .then((response)=>{
               console.log('response',response); 
               const result= stripe.redirectToCheckout({
                sessionId:response.data.id
            }); 
            console.log('result : ',result);
            if(result.error){
                Swal.fire("Error while payment");                    
            }
            });
        }catch(error){
            console.log("error : ",error);
        }
    }



    return(
        <>
            <div className=" dataTable">
                <h3>
                    Payment Detail's of Service Provider
                </h3>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="main-card mb-3 card">
                    <div className='table-responsive'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>ServiceProvider Name</th>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Wallet Amount</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paymentData.map((data,index)=>{
                                        console.log("data",data);
                                        return(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.providerName}</td>
                                            <td>{data.bankName}</td>
                                            <td>{data.accountNumber}</td>
                                            <td>{data.Wallet_amount}</td>
                                            <td>{data.paymentStatus}</td>
                                            <td><button className='btn btn-outline-success' onClick={()=>{getPayment(data)}}>Pay Now</button></td>
                                        </tr>)

                                    })
                                }                                                            
                            </tbody>
                        </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default ProviderPayment;