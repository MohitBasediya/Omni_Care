import "./Adminlogin.css";
import { useState } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap';
import Swal from 'sweetalert2';
import { adminURl } from '../../urls';

import { useNavigate } from "react-router-dom";
    
    function ForgotPassword() {
        const [Email,setEmail]=useState("");
        const handleInput=(e)=>{
            setEmail({...Email,[e.target.name]:e.target.value});
        }
        const submitData=async(e)=>{
            e.preventDefault();
                       
                    var result = await axios.post(adminURl+'/sendOtp',{Email});
                    console.log(result);                
                    if(result.status==201){
                        // setIsModal(true);
                    }else if(result.status==208){
                        Swal.fire("Some Error when sending email");
                    }else{
                        // Swal.fire({
                        //     icon:'error',
                        //     text:'Email already registered',
                        //     timer:2000
                        // })
                    }             
    
        }


    return (
        <>
            <div className="body">
                <div className="wrapper">
                    <header>Frogot Password </header>
                    <form method='post' onSubmit={submitData}>
                        <div className="field email">
                            <div className="input-area">
                                <input type="text" name="Email"  onChange={(e)=>{ handleInput(e) }}  placeholder="Enter Your Email Address"  />
                                <i className="icon fas fa-envelope"></i>
                                <i className="error error-icon fas fa-exclamation-circle"></i>
                            </div>
                        </div>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>

            <Modal  style={{ maxWidth: '500px', background: '#FFB649', padding: '10px', borderRadius: '12px' }}>
                <div className='w-100 py-2 px-3' style={{ background: '#FFB649', borderRadius: '12px' }}>
                    <form method='post'  className='w-100 p-4'>
                        <input type='text' name='otp' placeholder='Enter Otp'  className='form-control p-2 my-2' />
                        <input type='submit' value='Verify Otp'  className='btn btn-dark rounded-2 text-light ' />
                    </form>
                </div>
            </Modal>
        </>
    );
}
export default ForgotPassword;
