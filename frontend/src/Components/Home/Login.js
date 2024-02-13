import {Modal} from 'reactstrap';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { requestedURL } from '../../urls';
import { userData } from '../../store/userSlice.js';
import './Login.css';

function Login()
{   
    const [isModel,setIsModel]=useState(true);
    const [loginData,setLoginData]=useState();
    const [forgotpassword,setForgot]=useState(false);
    const [Email,setEmail] = useState('');
    const [Otp,setOtp] = useState('');
    const [Password,setPassword] = useState('');
    const [valEmail,setvalEmail] = useState(false);
    const [valOtp,setvalOtp] = useState('');
    const [valPass,setvalPass] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
     useEffect(()=>{
          var data=async()=>{
                var cookie_token= Cookie.get('Login_Jwt_token');
               console.log('logintoken :',cookie_token);
              if(cookie_token){
                try{
                     console.log(cookie_token);
                        var result = await axios.post(requestedURL+'/awt_login',{token:cookie_token});                                     
                    if(result.status==201){
                    //    Swal.fire("awthenticate");
                       console.log("useEffect");
                       dispatch(userData(result.data.payload.user.data));
                       console.log('service_provider : ',result.data);
                       if (result.data.payload.user.role === 'Service Provider') {
                        console.log('service provider : ',result.data.payload.user.data[0]);
                        dispatch(result.data.payload.user.data);
                        navigate('/Service_provider_profile');
                       }
                       else{
                        console.log('service provider : ',result.data.payload.User_Role);
                        dispatch(result.data.payload.user.data);
                        navigate('/customer_profile');
                       }
                       setIsModel(false);
                    }
                    else
                    {                        
                        setIsModel(true);
                    }             

                }catch(err){
                    console.log("Error while dealing with login in login component",err);
                }                
              }
              else{

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
        setEmail(value);
        validatefield(name,value);
    } 
    const getData3 = (event)=>{
        const {name,value} = event.target;
        setPassword(value);
        validatefield(name,value);
    }  
      const submitLogin = async (event)=>{
        event.preventDefault();
        console.log("login");
        console.log('logindataaaa',loginData);
        setIsModel(false);
        try{
            console.log("try");
            var result = await axios.post(requestedURL+'/login',loginData);
            console.log("result",result);

            if(result.status==201){
               Swal.fire("login success");
               Cookie.set('Login_Jwt_token',result.data.token,{expires:7});
               console.log('result :',result.data.exist);
               dispatch(userData(result.data.exist));
               if (result.data.role === 'Service Provider') {
                console.log("Service ")
                navigate('/Service_provider_profile');
               }
               else{
                navigate('/customer_profile');
               }
            }
            else if(result.status==203){
                console.log('result 243 ',result);
                Swal.fire("Password not matched");
                setIsModel(true);
            }
            else if(result.status==202){
                console.log('result 244 ',result);
                Swal.fire("Email not matched");
                setIsModel(true);
            }
            else{
                console.log('result error ',result);
                Swal.fire("Error while login");
                setIsModel(true);
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
              var result=await axios.get(requestedURL+`/getOtp/${Email}`);
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
      const submitOtp=async (e)=>{
        setForgot(false);
        e.preventDefault();
          try{
            console.log('otp : ',Otp);
            var result=await axios.post(requestedURL+'/checkOtp',{Otp});
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
      const changepassword=async (e)=>{
        setForgot(false);
        e.preventDefault();
        if(valPass){
            try{
              var result=await axios.post(requestedURL+'/changepassword',{Email,Password});
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
            Swal.fire('wrong syntax of Email');
            setForgot(true);
        }
      }
    return (
        <>
        {
            console.log(isModel)
        }
        <Modal isOpen={isModel} id='login-form' centered>
                    <div className="rounded-3" style={{background:'#FFB467',border:'none'}}>
                            <div className='d-flex justify-content-end'>
                                <button className='btn-close' aria-label="Close" onClick={() => { setIsModel(false) }}></button>
                            </div>
                        <div className="container p-0 ">
                            <div className="row g-0 p-2">                                
                                <div className="col-lg-12 p-3">                                    
                                    <div id='loginForm'>
                                        <h4 className="modal-title text-dark  fw-bold" id="staticBackdropLabel" > Login Here </h4>
                                        <form onSubmit={submitLogin} method='Post'>
                                            <div className="mb-3 mt-4 p-2 rounded-2 d-flex align-items-center" style={{background:'white'}}>
                                                <input type="email" name="email" className="form-control input-field" id="exampleInputEmail1" placeholder='Enter Email' aria-describedby="emailHelp"
                                                     onChange={(e)=>{getData(e)}} />
                                                <i className="fa fa-envelope icon text-dark" aria-hidden="true"></i>
                                            </div>
                                            <div className="mb-3 mt-4 p-2 rounded-2 d-flex flex-row align-items-center" style={{background:'white'}}>
                                                <input type="password" name="password" className="form-control input-field" id="exampleInputPassword1" placeholder="Enter Password" onChange={(e)=>{getData(e)}} />
                                                <i className="fa fa-unlock-alt icon text-dark" aria-hidden="true"></i>
                                            </div>
                                            <a className='text-dark' style={{background:'transparent',textDecoration:'none',cursor:'pointer'}} onClick={()=>{setForgot(true);setvalOtp('forgot');setIsModel(false)}}>Forgot Password</a><br/>
                                            <button type="submit" className="btn btn-light mt-3 mx-auto fs-6">Login</button>
                                            <p className='fs-5 mt-2 text-center py-2 text-light'>Don't have an account? <a className='webcolor' onClick={()=>{setIsModel(false)}}>SignUp</a></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
       </Modal>
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
    )
}
export default Login;