import  "./Adminlogin.css";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { adminURl } from '../../urls.js';
import { AdminData } from '../../store/AdminSlice';
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import {Modal} from 'reactstrap';


function Adminlogin() {

    const [isModel,setIsModel]=useState(true);
    const [loginData,setLoginData]=useState();
    const [forgotpassword,setForgot]=useState(false);
    const [Email,setEmail] = useState('');
    const [Otp,setOtp] = useState('');
    const [Password,setPassword] = useState('');
    const [valEmail,setvalEmail] = useState(false);
    const [valOtp,setvalOtp] = useState('');
    const [valPass,setvalPass] = useState(false);

    const navigte=useNavigate();
    const dispatch=useDispatch();
  
   useEffect(()=>{
        var data=async()=>{
          var cookie_token= Cookie.get('Admin_Jwt_token');
          console.log('logintoken :',cookie_token);
            if(cookie_token){
              try{
                   console.log(cookie_token);
                  var result = await axios.post(adminURl+'/awt_login',{token:cookie_token});                                     
                  if(result.status===201){
                  //    Swal.fire("awthenticate");
                     console.log('');
                     dispatch(AdminData(result.data.payload));
                     navigte('/admin/dashboard');
                    //  setIsModel(false);
                  }
                  else
                  {                        
                      // setIsModel(true);
                  }               

              }catch(err){
                  console.log("Error while dealing with login in login component",err);
              }                
            }
            else{
              Swal.fire("Login session is over");
            }
          }
          data();
   },[])

   const validatefield=(name,value)=>{
    switch(name){
        case 'Email':
            var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
            if(value.trim()===""){
                document.getElementById('email').style.color='red';
                document.getElementById('Email').innerHTML='Email Required';
                setvalEmail(false);
            }
            else if(reg.test(value)){
                document.getElementById('email').style.color='green';
                document.getElementById('Email').innerHTML='';
                setvalEmail(true);
            }
            else{
                document.getElementById('email').style.color='red';
                document.getElementById('Email').innerHTML='Invalid Email';
                setvalEmail(false);
            }
            break;
        case 'Password':
          var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(value.trim()===""){
                document.getElementById('password').style.color='red';
                document.getElementById('pass').innerHTML='Password Required';
                setvalPass(false);
            }
            else if(reg.test(value)){
                document.getElementById('password').style.color='green';
                document.getElementById('pass').innerHTML='';
                setvalPass(true);
            }
            else{
                document.getElementById('password').style.color='red';
                document.getElementById('pass').innerHTML='Invalid Password';
                setvalPass(false);
            }
            break;    
    }
}
 
  const getData = (event)=>{
      const {name,value} = event.target;
      setLoginData({
          ...loginData,
          [name]:value
      });  
    }  
    const getData2 = (event)=>{
      const {name,value} = event.target;
      console.log('event : ',event);
      setEmail(value);
      validatefield(name,value);
  } 
  const getData3 = (event)=>{
      const {name,value} = event.target;
      console.log('event : ',event);
      setPassword(value);
      validatefield(name,value);
  }  
    const submitLogin = async (event)=>{
      event.preventDefault();
      console.log("login");
      console.log(loginData);
      // setIsModel(false);
      try{
          console.log("try");
          var result = await axios.post(adminURl+'/login',loginData);
          console.log("result",result);

          if(result.status===201){
             Swal.fire("login success");
             Cookie.set('Admin_Jwt_token',result.data.token,{expires:7});
             console.log('result :',result.data.exist);
             dispatch(AdminData(result.data.exist));
             navigte('/admin/dashboard');
          }
          else if(result.status===203){
              console.log('result 203 ',result);
              Swal.fire("Password not matched");
              // setIsModel(true);
          }   
          else if(result.status===202){
              console.log('result 244 ',result);
              Swal.fire("Email not matched");
              // setIsModel(true);
          }
          else if(result.status===500){
              console.log('result error ',result);
              Swal.fire("Error while login");
              // setIsModel(true);
          }
      }catch(err){
          console.log("Error while dealing with login in login component",err);
      }
    }

    const submitEmail=async (e)=>{
      setForgot(false);
      e.preventDefault();
      if(valEmail){
          try{
              console.log('email : ',Email);
            var result=await axios.get(`${adminURl}/getOtp/${Email}`);
            if(result.status===201){
              setForgot(true);
              setvalOtp('get');
              console.log('email : ',Email);
            }
            else if(result.status===203){
              Swal.fire("Enter your registered email");
              setForgot(false);
              setIsModel(true);
            }
            else{
              Swal.fire("Error while sent Otp");
            }
          }catch(err){
              console.log('error when sent email ',err);
          }
      }else{
          Swal.fire('wrong syntax of Email');
          setForgot(true);
      }
    }

    const changepassword=async (e)=>{
      setForgot(false);
      e.preventDefault();
      if(valPass){
          try{
            var result=await axios.post(adminURl+'/changepassword',{Email,Password});
            if(result.status===201){
              Swal.fire("Password change succesfully");
              setForgot(false);
              setvalOtp('');
            }
            else if(result.status===203){
              setForgot(true);
            }
          }catch(err){
              console.log('error when change Password ',err);
          }
      }else{
          Swal.fire('Wrong Syntax of Password');
          setForgot(true);
      }
    }

    const submitOtp=async (e)=>{
      setForgot(false);
      e.preventDefault();
        try{
          console.log('otp : ',Otp);
          var result=await axios.post(adminURl+'/checkOtp',{Otp});
          if(result.status===201){
              setForgot(true);
              setvalOtp('pass');
              console.log('email : ',Email);
          }
          else if(result.status===203){
              Swal.fire('Wrong Otp');
              setIsModel(true);
          }
        }
        catch(err){
           console.log('Error occured while checkotp');
        }
    }

    return (
        <>

  <div className="body">
  <div className="wrapper">
    <header>Admin Login</header>
    <form method='post' onSubmit={submitLogin} >
      <div className="field email">
        <div className="input-area">
          <input type="text" className='login-input' name="Email" placeholder="Email Address"  onChange={(e)=>{getData(e)}}/>
          <i className="icon fas fa-envelope"></i>
          <i className="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div className="error error-txt">Email can't be blank</div>
      </div>
      <div className="field password">
        <div className="input-area">
          <input type="password" className='login-input' name="Password" placeholder="Password"  onChange={(e)=>{getData(e)}}/>
          <i className="icon fas fa-lock"></i>
          <i className="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div className="error error-txt">Password can't be blank</div>
      </div>
      <Link className='text-dark' style={{background:'transparent',textDecoration:'none',cursor:'pointer'}} onClick={()=>{setForgot(true);setvalOtp('forgot');setIsModel(false)}}>Forgot Password</Link><br/>
      <input type="submit" className='login-btn' value="Login"/>      
    </form>
  </div>
</div>



<Modal isOpen={forgotpassword} id='forgot-password' centered>
           <div className='rounded-3' style={{background:'#FFB467',border:'none'}}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn-close' aria-label="Close" onClick={() => { setForgot(false);setIsModel(true) }}></button>
                    </div>
                    <div className="container p-0 ">
                            <div className="row g-0 p-2">                                
                                <div className="col-lg-12 p-3">                                    
                                    <div id='loginForm'>
                                        {
                                          (valOtp==='forgot')?
                                            <>
                                            <h4 className="modal-title text-dark text-center fw-bold" id="staticBackdropLabel" > Forgot Password </h4>
                                            <form onSubmit={submitEmail} method='get'>
                                                <label className='text-dark pt-2'>Enter Email</label>
                                                <div className="mb-3 mt-4 p-2 rounded-2 d-flex align-items-center" style={{background:'white'}}>
                                                    <input type="email" name="Email" className="form-control text-dark input-field" id="email" placeholder='Enter Email'
                                                        onChange={(e)=>{getData2(e)}}/>
                                                    <i className="fa fa-envelope icon text-dark" aria-hidden="true"></i>
                                                    <p id='Email'></p>
                                                </div>
                                                <button type="submit" className="btn d-block btn-dark text-light mt-3 mx-auto fs-6">Get Otp</button>
                                            </form>
                                            </>
                                        :
                                          (valOtp==='get')?
                                            <>
                                            <h4 className="modal-title text-dark fw-bold text-center">Verify Otp</h4>
                                            <form onSubmit={submitOtp} method='post'>
                                                <label className='pt-2 text-dark'>Enter OTP</label>
                                                <div className="mb-3 mt-4 p-2 rounded-2 d-flex align-items-center" style={{background:'white'}}>
                                                    <input type="text" name="Otp" className="form-control input-field" id="otp" placeholder='Enter Otp' onChange={(e)=>{setOtp(e.target.value)}}/>                                                
                                                </div>
                                                <button type="submit" className="btn d-block btn-dark text-light mt-3 mx-auto fs-6">Verify Otp</button>
                                            </form>
                                            </>
                                            :(valOtp==='pass')?
                                            <>
                                            <h4 className="modal-title text-dark fw-bold text-center">Change Password</h4>
                                            <form onSubmit={changepassword} method='post'>
                                                <label className='pt-2 text-dark'>Enter Password</label>
                                                
                                                <div className="mb-3 mt-4 p-2 rounded-2 d-flex align-items-center" style={{background:'white'}}>
                                                    <input type="password" name="Password" className="form-control input-field" id="password" placeholder='Enter Password' onChange={(e)=>{getData3(e)}}/> 
                                                    <p id='pass'></p>                                               
                                                </div>
                                                <button type="submit" className="btn d-block btn-dark text-light mt-3 mx-auto fs-6">Change Password</button>
                                            </form>
                                            </>
                                            :''
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
       </Modal>
        </>


    );
}
export default Adminlogin;