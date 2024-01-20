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

function Adminlogin() {
  const navigte=useNavigate();
  const [loginData,setLoginData]=useState();
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

            }
          }
          data();
   },[])
 
  const getData = (event)=>{
      const {name,value} = event.target;
      setLoginData({
          ...loginData,
          [name]:value
      });  
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
              console.log('result 243 ',result);
              Swal.fire("Password not matched");
              // setIsModel(true);
          }   
          else if(result.status===202){
              console.log('result 244 ',result);
              Swal.fire("Email not matched");
              // setIsModel(true);
          }
          else{
              console.log('result error ',result);
              Swal.fire("Error while login");
              // setIsModel(true);
          }
      }catch(err){
          console.log("Error while dealing with login in login component",err);
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
          <input type="text" className='login-input' name="Email" placeholder="Email Address" onChange={getData}/>
          <i className="icon fas fa-envelope"></i>
          <i className="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div className="error error-txt">Email can't be blank</div>
      </div>
      <div className="field password">
        <div className="input-area">
          <input type="password" className='login-input' name="Password" placeholder="Password" onChange={getData}/>
          <i className="icon fas fa-lock"></i>
          <i className="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div className="error error-txt">Password can't be blank</div>
      </div>
      <div className="pass-txt"><Link to="/admin/forgotPassword">Forgot password?</Link></div>      
      <input type="submit" className='login-btn' value="Login"/>      
    </form>
  </div>
</div>
        </>


    );
}
export default Adminlogin;
